import { atom } from 'jotai';
import type { Candle, ChallengeRules, Side, Trade } from '@/types';
import {
  calculatePnL,
  checkStopLossTakeProfit,
  checkChallengeRules,
} from '@/lib/replay/engine';

// Replay data
export const candlesAtom = atom<Candle[]>([]);
export const currentIndexAtom = atom(-1);

// Playback
export const isPlayingAtom = atom(false);
export const speedAtom = atom(500);

// Trades & account
export const tradesAtom = atom<Trade[]>([]);
export const balanceAtom = atom(10000);
export const initialBalanceAtom = atom(10000);
export const equityAtom = atom(10000);
export const dailyStartEquityAtom = atom(10000);
export const highWaterMarkAtom = atom(10000);

// Challenge rules
export const rulesAtom = atom<ChallengeRules | null>(null);
export const violationsAtom = atom<string[]>([]);
export const passedAtom = atom(false);
export const failedAtom = atom(false);
export const tradingDaysAtom = atom(new Set<string>());

// Session configuration
export const symbolAtom = atom('EURUSD');
export const timeframeAtom = atom('1H');

export const setDataAtom = atom(null, (_get, set, candles: Candle[]) => {
  const uniqueCandles = Array.from(
    new Map(candles.map((candle) => [candle.time, candle])).values()
  ).sort((a, b) => a.time - b.time);

  set(candlesAtom, uniqueCandles);
  set(currentIndexAtom, uniqueCandles.length > 0 ? 0 : -1);
});

export const setAccountAtom = atom(
  null,
  (_get, set, { balance, rules }: { balance: number; rules: ChallengeRules }) => {
    set(balanceAtom, balance);
    set(initialBalanceAtom, balance);
    set(equityAtom, balance);
    set(dailyStartEquityAtom, balance);
    set(highWaterMarkAtom, balance);
    set(rulesAtom, rules);
  }
);

export const setSymbolAtom = atom(null, (_get, set, symbol: string) => {
  set(symbolAtom, symbol.trim().toUpperCase());
});

export const setTimeframeAtom = atom(null, (_get, set, timeframe: string) => {
  set(timeframeAtom, timeframe);
});

export const playAtom = atom(null, (_get, set) => set(isPlayingAtom, true));
export const pauseAtom = atom(null, (_get, set) => set(isPlayingAtom, false));
export const setSpeedAtom = atom(null, (_get, set, speed: number) =>
  set(speedAtom, speed)
);

export const jumpToAtom = atom(null, (get, set, index: number) => {
  const lastIndex = get(candlesAtom).length - 1;
  set(currentIndexAtom, Math.max(0, Math.min(index, lastIndex)));
});

export const updateEquityAtom = atom(null, (get, set) => {
  const currentIndex = get(currentIndexAtom);
  if (currentIndex < 0) return;

  const candle = get(candlesAtom)[currentIndex];
  if (!candle) return;

  let unrealizedPnL = 0;
  let realizedPnL = 0;

  for (const trade of get(tradesAtom)) {
    if (trade.status === 'open') {
      unrealizedPnL += calculatePnL(trade, candle.close);
    } else {
      realizedPnL += trade.pnl ?? 0;
    }
  }

  const initialBalance = get(initialBalanceAtom);
  const newEquity = initialBalance + realizedPnL + unrealizedPnL;
  const newHighWaterMark = Math.max(get(highWaterMarkAtom), newEquity);

  set(equityAtom, newEquity);
  set(highWaterMarkAtom, newHighWaterMark);

  const rules = get(rulesAtom);
  if (!rules) return;

  const result = checkChallengeRules(
    newEquity,
    get(balanceAtom),
    initialBalance,
    newHighWaterMark,
    get(dailyStartEquityAtom),
    rules,
    get(tradingDaysAtom).size
  );

  set(violationsAtom, result.violations);
  set(passedAtom, result.passed);
  set(failedAtom, result.failed);
});

export const stepForwardAtom = atom(null, (get, set) => {
  const candles = get(candlesAtom);
  const currentIndex = get(currentIndexAtom);

  if (currentIndex >= candles.length - 1) {
    set(isPlayingAtom, false);
    return;
  }

  const newIndex = currentIndex + 1;
  const candle = candles[newIndex];
  if (!candle) return;

  const updatedTrades = get(tradesAtom).map((trade) => {
    if (trade.status !== 'open') return trade;

    const hit = checkStopLossTakeProfit(trade, candle);

    if (hit === 'sl' && trade.stopLoss) {
      const pnl = calculatePnL(trade, trade.stopLoss);
      return {
        ...trade,
        status: 'closed' as const,
        exitPrice: trade.stopLoss,
        exitTime: candle.time,
        pnl,
      };
    }

    if (hit === 'tp' && trade.takeProfit) {
      const pnl = calculatePnL(trade, trade.takeProfit);
      return {
        ...trade,
        status: 'closed' as const,
        exitPrice: trade.takeProfit,
        exitTime: candle.time,
        pnl,
      };
    }

    return trade;
  });

  set(tradesAtom, updatedTrades);
  set(currentIndexAtom, newIndex);

  const tradingDays = new Set(get(tradingDaysAtom));
  tradingDays.add(new Date(candle.time * 1000).toDateString());
  set(tradingDaysAtom, tradingDays);

  set(updateEquityAtom);
});

export const stepBackwardAtom = atom(null, (get, set) => {
  const currentIndex = get(currentIndexAtom);
  if (currentIndex <= 0) return;
  set(currentIndexAtom, currentIndex - 1);
});

type OpenTradePayload = {
  side: Side;
  entryPrice: number;
  quantity: number;
  stopLoss?: number;
  takeProfit?: number;
};

export const openTradeAtom = atom(
  null,
  (get, set, { side, entryPrice, quantity, stopLoss, takeProfit }: OpenTradePayload) => {
    const candles = get(candlesAtom);
    const currentIndex = get(currentIndexAtom);
    const candle = candles[currentIndex];

    const trade: Trade = {
      id: crypto.randomUUID(),
      side,
      entryPrice,
      quantity,
      stopLoss,
      takeProfit,
      entryTime: candle?.time || Date.now() / 1000,
      status: 'open',
    };

    set(tradesAtom, [...get(tradesAtom), trade]);
    set(updateEquityAtom);
  }
);

type CloseTradePayload = {
  tradeId: string;
  exitPrice: number;
};

export const closeTradeAtom = atom(
  null,
  (get, set, { tradeId, exitPrice }: CloseTradePayload) => {
    const candles = get(candlesAtom);
    const currentIndex = get(currentIndexAtom);
    const candle = candles[currentIndex];

    const updatedTrades = get(tradesAtom).map((trade) => {
      if (trade.id !== tradeId || trade.status !== 'open') return trade;

      const pnl = calculatePnL(trade, exitPrice);

      return {
        ...trade,
        status: 'closed' as const,
        exitPrice,
        exitTime: candle?.time || Date.now() / 1000,
        pnl,
      };
    });

    set(tradesAtom, updatedTrades);
    set(updateEquityAtom);
  }
);
