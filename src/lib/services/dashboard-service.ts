import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { getFirebaseFirestore, getFirebaseStorage } from '@/lib/firebase/config';
import {
  DashboardData,
  INITIAL_DASHBOARD_DATA,
  SessionData,
} from '@/types/dashboard';

const STORAGE_KEY = 'fxr_dashboard_state';
const EVENT_NAME = 'fxr_dashboard_updated';

// Helper to notify any listening React components
export function broadcastDashboardUpdate(data: DashboardData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
  } catch (e) {
    console.warn('Failed to broadcast dashboard update', e);
  }
}

// Get cached data from localStorage or initial
export function getLocalDashboardData(userId: string = 'default_user'): DashboardData {
  if (typeof window === 'undefined') {
    return { ...INITIAL_DASHBOARD_DATA, userId };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_DASHBOARD_DATA, ...parsed, userId };
    }
  } catch {
    // ignore
  }
  return { ...INITIAL_DASHBOARD_DATA, userId };
}

// Fetch from local SQLite DB API
export async function fetchDashboardData(userId: string = 'default_user'): Promise<DashboardData> {
  try {
    const res = await fetch(`/api/dashboard?userId=${encodeURIComponent(userId)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      broadcastDashboardUpdate(data);
      return data;
    }
  } catch (err) {
    console.warn('fetchDashboardData fallback to local:', err);
  }
  return getLocalDashboardData(userId);
}

// Save dashboard data to SQLite DB and Firebase Firestore
export async function saveDashboardData(
  userId: string,
  partialData: Partial<DashboardData>
): Promise<DashboardData> {
  const current = getLocalDashboardData(userId);
  const updated: DashboardData = {
    ...current,
    ...partialData,
    userId,
    updatedAt: Date.now(),
  };

  // 1. Broadcast locally immediately for instant zero-lag UI update
  broadcastDashboardUpdate(updated);

  // 2. Persist to SQLite via API in background
  try {
    fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('SQLite sync warning:', err));
  } catch {
    // ignore background error
  }

  // 3. Try to persist to Firebase Firestore
  try {
    const firestore = getFirebaseFirestore();
    const docRef = doc(firestore, 'user_dashboards', userId);
    setDoc(docRef, updated, { merge: true }).catch((err) => {
      // Offline or permission issue, silently handled
      console.warn('Firestore sync note:', err.message);
    });
  } catch {
    // ignore
  }

  return updated;
}

// Subscribe to real-time dashboard updates (Firestore + local event bus)
export function subscribeToDashboardData(
  userId: string = 'default_user',
  onUpdate: (data: DashboardData) => void
): () => void {
  // First deliver initial local cached data
  const initial = getLocalDashboardData(userId);
  onUpdate(initial);

  // Fetch fresh from SQLite DB API
  fetchDashboardData(userId).then(onUpdate).catch(() => {});

  // Listen to window custom events (cross-component sync)
  const handleLocalEvent = (e: Event) => {
    const detail = (e as CustomEvent<DashboardData>).detail;
    if (detail) {
      onUpdate(detail);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener(EVENT_NAME, handleLocalEvent);
  }

  // Set up Firebase Firestore real-time listener if available
  let unsubscribeFirestore: (() => void) | undefined;
  try {
    const firestore = getFirebaseFirestore();
    const docRef = doc(firestore, 'user_dashboards', userId);
    unsubscribeFirestore = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data() as DashboardData;
          broadcastDashboardUpdate(cloudData);
          onUpdate(cloudData);
        }
      },
      (error) => {
        // Silently handle offline/unavailable Firestore connection
        console.warn('Firestore realtime listener note:', error.message);
      }
    );
  } catch {
    // Firestore not initialized
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener(EVENT_NAME, handleLocalEvent);
    }
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
    }
  };
}

// Increment user active chart time in real time
export async function incrementChartTime(
  userId: string = 'default_user',
  seconds: number = 1
): Promise<{ totalSeconds: number; todaySeconds: number }> {
  const current = getLocalDashboardData(userId);
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const newTotal = (current.timeInvestedSeconds || 0) + seconds;
  const newLogs = { ...(current.chartTimeLogs || {}) };
  newLogs[todayStr] = (newLogs[todayStr] || 0) + seconds;

  const updated: DashboardData = {
    ...current,
    timeInvestedSeconds: newTotal,
    chartTimeLogs: newLogs,
    updatedAt: Date.now(),
  };

  broadcastDashboardUpdate(updated);

  // Sync to backend SQLite endpoint
  try {
    fetch('/api/dashboard/chart-time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, seconds }),
    }).catch(() => {});
  } catch {
    // ignore
  }

  // Try Firestore update
  try {
    const firestore = getFirebaseFirestore();
    const docRef = doc(firestore, 'user_dashboards', userId);
    setDoc(docRef, {
      timeInvestedSeconds: newTotal,
      chartTimeLogs: newLogs,
      updatedAt: Date.now(),
    }, { merge: true }).catch(() => {});
  } catch {
    // ignore
  }

  return { totalSeconds: newTotal, todaySeconds: newLogs[todayStr] };
}

// Record a trade execution in real time to update metrics
export async function recordTradeMetric(
  userId: string = 'default_user',
  tradeSide: 'long' | 'short',
  isWin?: boolean
): Promise<DashboardData> {
  const current = getLocalDashboardData(userId);
  const totalTrades = (current.totalTrades || 0) + 1;
  const buyTrades = tradeSide === 'long' ? (current.buyTrades || 0) + 1 : (current.buyTrades || 0);
  const sellTrades = tradeSide === 'short' ? (current.sellTrades || 0) + 1 : (current.sellTrades || 0);
  const winningTrades = isWin ? (current.winningTrades || 0) + 1 : (current.winningTrades || 0);
  const winRate = Number(((winningTrades / totalTrades) * 100).toFixed(2));

  return saveDashboardData(userId, {
    totalTrades,
    buyTrades,
    sellTrades,
    winningTrades,
    winRate,
  });
}

// Backup entire dashboard payload to Firebase Storage
export async function backupToFirebaseStorage(
  userId: string = 'default_user',
  data?: DashboardData
): Promise<{ success: boolean; backupUrl: string; timestamp: number; message: string }> {
  const payload = data || getLocalDashboardData(userId);
  const timestamp = Date.now();

  let storageUploadSucceeded = false;
  let firestoreUploadSucceeded = false;

  // 1. Try direct Firebase Storage client SDK upload
  try {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, `dashboards/${userId}/dashboard-backup.json`);
    const jsonString = JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      timestamp,
      userId,
      dashboardData: payload,
    }, null, 2);

    await uploadString(storageRef, jsonString, 'raw', {
      contentType: 'application/json',
    });
    const url = await getDownloadURL(storageRef);
    storageUploadSucceeded = true;

    await saveDashboardData(userId, {
      storageBackupUrl: url,
      storageBackupTimestamp: timestamp,
      storageSyncStatus: 'synced',
    });

    return {
      success: true,
      backupUrl: url,
      timestamp,
      message: 'Dashboard backup successfully saved to Firebase Storage!',
    };
  } catch (clientErr) {
    console.warn('Client Firebase Storage note (falling back to server backup):', clientErr);
  }

  // 2. Server API fallback for Firebase Storage & local persistence
  try {
    const res = await fetch('/api/dashboard/backup-storage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, data: payload }),
    });

    if (res.ok) {
      const result = await res.json();
      broadcastDashboardUpdate({
        ...payload,
        storageBackupUrl: result.backupUrl,
        storageBackupTimestamp: result.timestamp,
        storageSyncStatus: 'synced',
      });
      return {
        success: true,
        backupUrl: result.backupUrl,
        timestamp: result.timestamp,
        message: 'Dashboard backup generated and stored successfully!',
      };
    }
  } catch (apiErr) {
    console.error('Backup API error:', apiErr);
  }

  return {
    success: false,
    backupUrl: '',
    timestamp,
    message: 'Backup failed to sync to storage.',
  };
}
