export interface SessionData {
  id: string;
  name: string;
  retentionDays: string;
  dateRange: string;
  balance: string;
  symbol: string;
  progressPercent: number;
  remainingDays: number;
  tradesCount: number;
  winRate: string;
  netPnl: string;
  profitFactor: string;
  maxDrawdown: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface DashboardData {
  userId: string;
  timeInvestedSeconds: number;
  historicalTimeReplayedSeconds: number;
  totalTrades: number;
  buyTrades: number;
  sellTrades: number;
  winningTrades: number;
  winRate: number;
  streakDays: number;
  lastStreakDate?: string;
  selectedMode: string;
  selectedTimeFilter: string;
  selectedTab: string;
  sessions: SessionData[];
  chartTimeLogs: Record<string, number>;
  storageBackupUrl?: string | null;
  storageBackupTimestamp?: number | null;
  storageSyncStatus?: 'synced' | 'syncing' | 'local' | 'error';
  updatedAt: number;
}

export const INITIAL_SESSIONS: SessionData[] = [
  {
    id: 'gold-sma',
    name: 'gold sma 5-13',
    retentionDays: '7 days',
    dateRange: '9/15/26 - 10/23/26',
    balance: '$48,672.39',
    symbol: 'XAUUSD',
    progressPercent: 78.95,
    remainingDays: 8,
    tradesCount: 26,
    winRate: '42.31%',
    netPnl: '+$8,672.39',
    profitFactor: '1.84',
    maxDrawdown: '2.4%',
  },
  {
    id: 'asia',
    name: 'Asia',
    retentionDays: '6 days',
    dateRange: '8/6/25 - 10/23/26',
    balance: '$11,079.16',
    symbol: 'XAUUSD',
    progressPercent: 7.22,
    remainingDays: 411,
    tradesCount: 13,
    winRate: '38.46%',
    netPnl: '+$1,079.16',
    profitFactor: '1.52',
    maxDrawdown: '1.8%',
  },
];

export const INITIAL_DASHBOARD_DATA: DashboardData = {
  userId: 'default_user',
  timeInvestedSeconds: 3420, // 57 min
  historicalTimeReplayedSeconds: 4986000, // 1 mo 27 d 17 hr
  totalTrades: 39,
  buyTrades: 21,
  sellTrades: 18,
  winningTrades: 16,
  winRate: 41.03,
  streakDays: 2,
  lastStreakDate: new Date().toISOString().split('T')[0],
  selectedMode: 'Backtesting',
  selectedTimeFilter: 'Lifetime',
  selectedTab: 'Dashboard',
  sessions: INITIAL_SESSIONS,
  chartTimeLogs: {
    '2026-10-19': 600,
    '2026-10-20': 900,
    '2026-10-21': 480,
    '2026-10-22': 540,
    '2026-10-23': 900,
  },
  storageBackupUrl: null,
  storageBackupTimestamp: null,
  storageSyncStatus: 'synced',
  updatedAt: Date.now(),
};
