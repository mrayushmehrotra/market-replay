import { Candle, Trade, Side, ChallengeRules } from '@/types';

export function calculatePnL(trade: Trade, currentPrice: number): number {
  if (trade.side === 'long') {
    return (currentPrice - trade.entryPrice) * trade.quantity;
  } else {
    return (trade.entryPrice - currentPrice) * trade.quantity;
  }
}

export function checkStopLossTakeProfit(trade: Trade, candle: Candle): 'sl' | 'tp' | null {
  if (trade.status !== 'open') return null;
  
  if (trade.side === 'long') {
    if (trade.stopLoss && candle.low <= trade.stopLoss) return 'sl';
    if (trade.takeProfit && candle.high >= trade.takeProfit) return 'tp';
  } else {
    if (trade.stopLoss && candle.high >= trade.stopLoss) return 'sl';
    if (trade.takeProfit && candle.low <= trade.takeProfit) return 'tp';
  }
  return null;
}

export function checkChallengeRules(
  equity: number,
  balance: number,
  initialBalance: number,
  highWaterMark: number,
  dailyStartEquity: number,
  rules: ChallengeRules,
  tradingDays: number
): { violations: string[]; passed: boolean; failed: boolean } {
  const violations: string[] = [];
  
  // Profit target
  const profitPercent = ((equity - initialBalance) / initialBalance) * 100;
  if (profitPercent >= rules.profitTarget) {
    return { violations: [], passed: true, failed: false };
  }
  
  // Max overall drawdown
  const overallDD = ((highWaterMark - equity) / highWaterMark) * 100;
  if (overallDD >= rules.maxOverallDrawdown) {
    violations.push(`Max overall drawdown breached: ${overallDD.toFixed(2)}%`);
    return { violations, passed: false, failed: true };
  }
  
  // Max daily drawdown
  const dailyDD = ((dailyStartEquity - equity) / dailyStartEquity) * 100;
  if (dailyDD >= rules.maxDailyDrawdown) {
    violations.push(`Max daily drawdown breached: ${dailyDD.toFixed(2)}%`);
    return { violations, passed: false, failed: true };
  }
  
  // Min trading days check (if not passed)
  if (tradingDays < rules.minTradingDays && profitPercent >= rules.profitTarget) {
    violations.push(`Minimum trading days not met: ${tradingDays}/${rules.minTradingDays}`);
  }
  
  return { violations, passed: false, failed: false };
}

export function getDefaultRules(challengeType: string): ChallengeRules {
  switch (challengeType) {
    case 'ftmo':
      return {
        profitTarget: 10,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 10,
        minTradingDays: 4,
      };
    case 'myforexfunds':
      return {
        profitTarget: 8,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 12,
        minTradingDays: 5,
      };
    case 'topstep':
      return {
        profitTarget: 6,
        maxDailyDrawdown: 3,
        maxOverallDrawdown: 6,
        minTradingDays: 2,
      };
    case 'the5ers':
      return {
        profitTarget: 6,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 10,
        minTradingDays: 3,
      };
    case 'fundednext':
      return {
        profitTarget: 10,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 10,
        minTradingDays: 4,
      };
    default:
      return {
        profitTarget: 10,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 10,
        minTradingDays: 4,
      };
  }
}
