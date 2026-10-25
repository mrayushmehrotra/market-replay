import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dashboardState } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_DASHBOARD_DATA } from '@/types/dashboard';

export async function POST(request: Request) {
  try {
    const { userId = 'default_user', seconds = 1 } = await request.json();
    const secToAdd = Math.max(0, Number(seconds) || 1);

    const row = db
      .select()
      .from(dashboardState)
      .where(eq(dashboardState.userId, userId))
      .get();

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    let currentTotal = INITIAL_DASHBOARD_DATA.timeInvestedSeconds;
    let chartLogs: Record<string, number> = { ...INITIAL_DASHBOARD_DATA.chartTimeLogs };

    if (row) {
      currentTotal = row.timeInvestedSeconds;
      if (row.chartTimeLogs) {
        chartLogs = typeof row.chartTimeLogs === 'string'
          ? JSON.parse(row.chartTimeLogs)
          : row.chartTimeLogs;
      }
    }

    const newTotal = currentTotal + secToAdd;
    chartLogs[todayStr] = (chartLogs[todayStr] || 0) + secToAdd;

    if (row) {
      db.update(dashboardState)
        .set({
          timeInvestedSeconds: newTotal,
          chartTimeLogs: JSON.stringify(chartLogs),
          updatedAt: now,
        })
        .where(eq(dashboardState.userId, userId))
        .run();
    } else {
      db.insert(dashboardState)
        .values({
          userId,
          timeInvestedSeconds: newTotal,
          historicalTimeReplayedSeconds: INITIAL_DASHBOARD_DATA.historicalTimeReplayedSeconds,
          totalTrades: INITIAL_DASHBOARD_DATA.totalTrades,
          buyTrades: INITIAL_DASHBOARD_DATA.buyTrades,
          sellTrades: INITIAL_DASHBOARD_DATA.sellTrades,
          winningTrades: INITIAL_DASHBOARD_DATA.winningTrades,
          winRate: INITIAL_DASHBOARD_DATA.winRate,
          streakDays: INITIAL_DASHBOARD_DATA.streakDays,
          lastStreakDate: todayStr,
          selectedMode: INITIAL_DASHBOARD_DATA.selectedMode,
          selectedTimeFilter: INITIAL_DASHBOARD_DATA.selectedTimeFilter,
          selectedTab: INITIAL_DASHBOARD_DATA.selectedTab,
          sessions: JSON.stringify(INITIAL_DASHBOARD_DATA.sessions),
          chartTimeLogs: JSON.stringify(chartLogs),
          storageBackupUrl: null,
          storageBackupTimestamp: null,
          updatedAt: now,
        })
        .run();
    }

    return NextResponse.json({
      success: true,
      timeInvestedSeconds: newTotal,
      chartTimeLogs: chartLogs,
      todaySeconds: chartLogs[todayStr],
    });
  } catch (error) {
    console.error('API /api/dashboard/chart-time error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
