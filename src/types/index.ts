export type Candle = {
  time: number; // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type Side = 'long' | 'short';

export type Trade = {
  id: string;
  side: Side;
  entryPrice: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  quantity: number;
  entryTime: number;
  exitTime?: number;
  pnl?: number;
  status: 'open' | 'closed';
  notes?: string;
};

export type ChallengeType = 
  | 'ftmo'
  | 'myforexfunds'
  | 'topstep'
  | 'the5ers'
  | 'fundednext'
  | 'custom';

export type ChallengeRules = {
  profitTarget: number; // percentage
  maxDailyDrawdown: number; // percentage
  maxOverallDrawdown: number; // percentage
  minTradingDays: number;
  maxTradingDays?: number;
  consistencyRule?: boolean;
  consistencyPercentage?: number;
  newsTradingAllowed?: boolean;
};

export type AccountSetup = {
  accountSize: number;
  challengeType: ChallengeType;
  rules: ChallengeRules;
};

export type ReplayState = {
  candles: Candle[];
  currentIndex: number;
  isPlaying: boolean;
  speed: number; // ms per candle
  trades: Trade[];
  equity: number;
  balance: number;
  dailyStartEquity: number;
  highWaterMark: number;
  violations: string[];
  passed: boolean;
  failed: boolean;
};
