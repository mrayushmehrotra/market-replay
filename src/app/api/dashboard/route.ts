import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dashboardState } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardData, INITIAL_DASHBOARD_DATA } from '@/types/dashboard';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';

    const row = db
      .select()
      .from(dashboardState)
      .where(eq(dashboardState.userId, userId))
      .get();

    if (!row) {
      // Seed initial record
      const now = new Date();
      db.insert(dashboardState)
        .values({
          userId,
          timeInvestedSeconds: INITIAL_DASHBOARD_DATA.timeInvestedSeconds,
          historicalTimeReplayedSeconds: INITIAL_DASHBOARD_DATA.historicalTimeReplayedSeconds,
          totalTrades: INITIAL_DASHBOARD_DATA.totalTrades,
          buyTrades: INITIAL_DASHBOARD_DATA.buyTrades,
          sellTrades: INITIAL_DASHBOARD_DATA.sellTrades,
          winningTrades: INITIAL_DASHBOARD_DATA.winningTrades,
          winRate: INITIAL_DASHBOARD_DATA.winRate,
          streakDays: INITIAL_DASHBOARD_DATA.streakDays,
          lastStreakDate: INITIAL_DASHBOARD_DATA.lastStreakDate,
          selectedMode: INITIAL_DASHBOARD_DATA.selectedMode,
          selectedTimeFilter: INITIAL_DASHBOARD_DATA.selectedTimeFilter,
          selectedTab: INITIAL_DASHBOARD_DATA.selectedTab,
          sessions: JSON.stringify(INITIAL_DASHBOARD_DATA.sessions),
          chartTimeLogs: JSON.stringify(INITIAL_DASHBOARD_DATA.chartTimeLogs),
          storageBackupUrl: INITIAL_DASHBOARD_DATA.storageBackupUrl,
          storageBackupTimestamp: INITIAL_DASHBOARD_DATA.storageBackupTimestamp,
          updatedAt: now,
        })
        .run();

      return NextResponse.json({ ...INITIAL_DASHBOARD_DATA, userId });
    }

    const sessions = typeof row.sessions === 'string'
      ? JSON.parse(row.sessions)
      : row.sessions || INITIAL_DASHBOARD_DATA.sessions;

    const chartTimeLogs = typeof row.chartTimeLogs === 'string'
      ? JSON.parse(row.chartTimeLogs)
      : row.chartTimeLogs || INITIAL_DASHBOARD_DATA.chartTimeLogs;

    const result: DashboardData = {
      userId: row.userId,
      timeInvestedSeconds: row.timeInvestedSeconds,
      historicalTimeReplayedSeconds: row.historicalTimeReplayedSeconds,
      totalTrades: row.totalTrades,
      buyTrades: row.buyTrades,
      sellTrades: row.sellTrades,
      winningTrades: row.winningTrades,
      winRate: row.winRate,
      streakDays: row.streakDays,
      lastStreakDate: row.lastStreakDate || undefined,
      selectedMode: row.selectedMode,
      selectedTimeFilter: row.selectedTimeFilter,
      selectedTab: row.selectedTab,
      sessions,
      chartTimeLogs,
      storageBackupUrl: row.storageBackupUrl,
      storageBackupTimestamp: row.storageBackupTimestamp,
      storageSyncStatus: 'synced',
      updatedAt: row.updatedAt ? new Date(row.updatedAt).getTime() : Date.now(),
    };

    return NextResponse.json(result);
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) throw error;
    console.error('API /api/dashboard GET error:', error);
    return NextResponse.json(INITIAL_DASHBOARD_DATA, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default_user';

    const existing = db
      .select()
      .from(dashboardState)
      .where(eq(dashboardState.userId, userId))
      .get();

    const now = new Date();
    const updateValues: Record<string, unknown> = {
      updatedAt: now,
    };

    if (body.timeInvestedSeconds !== undefined) {
      updateValues.timeInvestedSeconds = Number(body.timeInvestedSeconds);
    }
    if (body.historicalTimeReplayedSeconds !== undefined) {
      updateValues.historicalTimeReplayedSeconds = Number(body.historicalTimeReplayedSeconds);
    }
    if (body.totalTrades !== undefined) {
      updateValues.totalTrades = Number(body.totalTrades);
    }
    if (body.buyTrades !== undefined) {
      updateValues.buyTrades = Number(body.buyTrades);
    }
    if (body.sellTrades !== undefined) {
      updateValues.sellTrades = Number(body.sellTrades);
    }
    if (body.winningTrades !== undefined) {
      updateValues.winningTrades = Number(body.winningTrades);
    }
    if (body.winRate !== undefined) {
      updateValues.winRate = Number(body.winRate);
    }
    if (body.streakDays !== undefined) {
      updateValues.streakDays = Number(body.streakDays);
    }
    if (body.lastStreakDate !== undefined) {
      updateValues.lastStreakDate = body.lastStreakDate;
    }
    if (body.selectedMode !== undefined) {
      updateValues.selectedMode = String(body.selectedMode);
    }
    if (body.selectedTimeFilter !== undefined) {
      updateValues.selectedTimeFilter = String(body.selectedTimeFilter);
    }
    if (body.selectedTab !== undefined) {
      updateValues.selectedTab = String(body.selectedTab);
    }
    if (body.sessions !== undefined) {
      updateValues.sessions = JSON.stringify(body.sessions);
    }
    if (body.chartTimeLogs !== undefined) {
      updateValues.chartTimeLogs = JSON.stringify(body.chartTimeLogs);
    }
    if (body.storageBackupUrl !== undefined) {
      updateValues.storageBackupUrl = body.storageBackupUrl;
    }
    if (body.storageBackupTimestamp !== undefined) {
      updateValues.storageBackupTimestamp = body.storageBackupTimestamp;
    }

    if (existing) {
      db.update(dashboardState)
        .set(updateValues)
        .where(eq(dashboardState.userId, userId))
        .run();
    } else {
      db.insert(dashboardState)
        .values({
          userId,
          timeInvestedSeconds: Number(body.timeInvestedSeconds ?? INITIAL_DASHBOARD_DATA.timeInvestedSeconds),
          historicalTimeReplayedSeconds: Number(body.historicalTimeReplayedSeconds ?? INITIAL_DASHBOARD_DATA.historicalTimeReplayedSeconds),
          totalTrades: Number(body.totalTrades ?? INITIAL_DASHBOARD_DATA.totalTrades),
          buyTrades: Number(body.buyTrades ?? INITIAL_DASHBOARD_DATA.buyTrades),
          sellTrades: Number(body.sellTrades ?? INITIAL_DASHBOARD_DATA.sellTrades),
          winningTrades: Number(body.winningTrades ?? INITIAL_DASHBOARD_DATA.winningTrades),
          winRate: Number(body.winRate ?? INITIAL_DASHBOARD_DATA.winRate),
          streakDays: Number(body.streakDays ?? INITIAL_DASHBOARD_DATA.streakDays),
          lastStreakDate: body.lastStreakDate ?? INITIAL_DASHBOARD_DATA.lastStreakDate,
          selectedMode: body.selectedMode ?? INITIAL_DASHBOARD_DATA.selectedMode,
          selectedTimeFilter: body.selectedTimeFilter ?? INITIAL_DASHBOARD_DATA.selectedTimeFilter,
          selectedTab: body.selectedTab ?? INITIAL_DASHBOARD_DATA.selectedTab,
          sessions: JSON.stringify(body.sessions ?? INITIAL_DASHBOARD_DATA.sessions),
          chartTimeLogs: JSON.stringify(body.chartTimeLogs ?? INITIAL_DASHBOARD_DATA.chartTimeLogs),
          storageBackupUrl: body.storageBackupUrl ?? null,
          storageBackupTimestamp: body.storageBackupTimestamp ?? null,
          updatedAt: now,
        })
        .run();
    }

    return NextResponse.json({ success: true, userId, updatedAt: now.getTime() });
  } catch (error) {
    console.error('API /api/dashboard POST error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
