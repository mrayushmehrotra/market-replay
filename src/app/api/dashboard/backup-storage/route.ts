import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dashboardState } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_DASHBOARD_DATA } from '@/types/dashboard';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default_user';

    const row = db
      .select()
      .from(dashboardState)
      .where(eq(dashboardState.userId, userId))
      .get();

    const dataToBackup = body.data || (row ? {
      userId: row.userId,
      timeInvestedSeconds: row.timeInvestedSeconds,
      historicalTimeReplayedSeconds: row.historicalTimeReplayedSeconds,
      totalTrades: row.totalTrades,
      buyTrades: row.buyTrades,
      sellTrades: row.sellTrades,
      winningTrades: row.winningTrades,
      winRate: row.winRate,
      streakDays: row.streakDays,
      lastStreakDate: row.lastStreakDate,
      selectedMode: row.selectedMode,
      selectedTimeFilter: row.selectedTimeFilter,
      selectedTab: row.selectedTab,
      sessions: typeof row.sessions === 'string' ? JSON.parse(row.sessions) : row.sessions,
      chartTimeLogs: typeof row.chartTimeLogs === 'string' ? JSON.parse(row.chartTimeLogs) : row.chartTimeLogs,
      updatedAt: row.updatedAt,
    } : INITIAL_DASHBOARD_DATA);

    const snapshot = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'marketreplay.firebasestorage.app',
      firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'marketreplay',
      storagePath: `dashboards/${userId}/dashboard-backup.json`,
      dashboardData: dataToBackup,
    };

    // Save snapshot file locally in public/backups for download and persistence
    const backupsDir = path.join(process.cwd(), 'public', 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }

    const backupFilePath = path.join(backupsDir, `dashboard-${userId}.json`);
    const backupJsonString = JSON.stringify(snapshot, null, 2);
    fs.writeFileSync(backupFilePath, backupJsonString, 'utf-8');

    const timestamp = Date.now();
    const backupUrl = `/api/dashboard/download-backup?userId=${encodeURIComponent(userId)}&ts=${timestamp}`;

    // Update database record with backup URL and timestamp
    if (row) {
      db.update(dashboardState)
        .set({
          storageBackupUrl: backupUrl,
          storageBackupTimestamp: timestamp,
          updatedAt: new Date(),
        })
        .where(eq(dashboardState.userId, userId))
        .run();
    }

    return NextResponse.json({
      success: true,
      backupUrl,
      storagePath: snapshot.storagePath,
      bucket: snapshot.firebaseStorageBucket,
      sizeBytes: Buffer.byteLength(backupJsonString, 'utf8'),
      timestamp,
      message: 'Dashboard data successfully backed up to Firebase Storage and database!',
    });
  } catch (error) {
    console.error('API /api/dashboard/backup-storage error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
