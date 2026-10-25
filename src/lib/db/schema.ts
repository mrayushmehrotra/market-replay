import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Local profile mirror of the authenticated Firebase user.
export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const backtest = sqliteTable('backtest', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  name: text('name').notNull(),
  symbol: text('symbol').notNull(),
  timeframe: text('timeframe').notNull(),
  accountSize: integer('account_size').notNull(),
  challengeType: text('challenge_type').notNull(),
  rules: text('rules', { mode: 'json' }).notNull(),
  dataSource: text('data_source').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const trade = sqliteTable('trade', {
  id: text('id').primaryKey(),
  backtestId: text('backtest_id')
    .notNull()
    .references(() => backtest.id),
  side: text('side').notNull(), // long | short
  entryPrice: real('entry_price').notNull(),
  exitPrice: real('exit_price'),
  stopLoss: real('stop_loss'),
  takeProfit: real('take_profit'),
  quantity: real('quantity').notNull(),
  entryTime: integer('entry_time', { mode: 'timestamp' }).notNull(),
  exitTime: integer('exit_time', { mode: 'timestamp' }),
  pnl: real('pnl'),
  status: text('status').notNull(), // open | closed
  notes: text('notes'),
});

export const dashboardState = sqliteTable('dashboard_state', {
  userId: text('user_id').primaryKey(),
  timeInvestedSeconds: integer('time_invested_seconds').notNull().default(3420),
  historicalTimeReplayedSeconds: integer('historical_time_replayed_seconds').notNull().default(4986000),
  totalTrades: integer('total_trades').notNull().default(39),
  buyTrades: integer('buy_trades').notNull().default(21),
  sellTrades: integer('sell_trades').notNull().default(18),
  winningTrades: integer('winning_trades').notNull().default(16),
  winRate: real('win_rate').notNull().default(41.03),
  streakDays: integer('streak_days').notNull().default(2),
  lastStreakDate: text('last_streak_date'),
  selectedMode: text('selected_mode').notNull().default('Backtesting'),
  selectedTimeFilter: text('selected_time_filter').notNull().default('Lifetime'),
  selectedTab: text('selected_tab').notNull().default('Dashboard'),
  sessions: text('sessions', { mode: 'json' }),
  chartTimeLogs: text('chart_time_logs', { mode: 'json' }),
  storageBackupUrl: text('storage_backup_url'),
  storageBackupTimestamp: integer('storage_backup_timestamp'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
