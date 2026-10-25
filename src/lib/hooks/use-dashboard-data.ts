'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import {
  DashboardData,
  INITIAL_DASHBOARD_DATA,
  SessionData,
} from '@/types/dashboard';
import {
  backupToFirebaseStorage,
  getLocalDashboardData,
  saveDashboardData,
  subscribeToDashboardData,
} from '@/lib/services/dashboard-service';

export function useDashboardData() {
  const auth = useAuth();
  const userId = auth.user?.uid || 'default_user';

  const [data, setData] = useState<DashboardData>(() => getLocalDashboardData(userId));
  const [loading, setLoading] = useState(false);
  const [backingUp, setBackingUp] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToDashboardData(userId, (newData) => {
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const setMode = useCallback((mode: string) => {
    setData((prev) => ({ ...prev, selectedMode: mode }));
    saveDashboardData(userId, { selectedMode: mode });
  }, [userId]);

  const setTimeFilter = useCallback((timeFilter: string) => {
    setData((prev) => ({ ...prev, selectedTimeFilter: timeFilter }));
    saveDashboardData(userId, { selectedTimeFilter: timeFilter });
  }, [userId]);

  const setSelectedTab = useCallback((tab: string) => {
    setData((prev) => ({ ...prev, selectedTab: tab }));
    saveDashboardData(userId, { selectedTab: tab });
  }, [userId]);

  const updateSessions = useCallback((sessions: SessionData[]) => {
    // Recalculate trades count from sessions
    const totalTrades = sessions.reduce((acc, s) => acc + (s.tradesCount || 0), 0);
    setData((prev) => ({ ...prev, sessions, totalTrades }));
    saveDashboardData(userId, { sessions, totalTrades });
  }, [userId]);

  const addSession = useCallback((newSession: SessionData) => {
    setData((prev) => {
      const updated = [newSession, ...prev.sessions];
      saveDashboardData(userId, { sessions: updated });
      return { ...prev, sessions: updated };
    });
  }, [userId]);

  const duplicateSession = useCallback((session: SessionData) => {
    const copy: SessionData = {
      ...session,
      id: `${session.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${session.name} (Copy)`,
      retentionDays: '7 days',
    };
    addSession(copy);
  }, [addSession]);

  const deleteSession = useCallback((sessionId: string) => {
    setData((prev) => {
      const updated = prev.sessions.filter((s) => s.id !== sessionId);
      saveDashboardData(userId, { sessions: updated });
      return { ...prev, sessions: updated };
    });
  }, [userId]);

  const triggerStorageBackup = useCallback(async () => {
    setBackingUp(true);
    try {
      const res = await backupToFirebaseStorage(userId, data);
      return res;
    } finally {
      setBackingUp(false);
    }
  }, [userId, data]);

  return {
    data,
    loading,
    backingUp,
    setMode,
    setTimeFilter,
    setSelectedTab,
    updateSessions,
    addSession,
    duplicateSession,
    deleteSession,
    triggerStorageBackup,
  };
}
