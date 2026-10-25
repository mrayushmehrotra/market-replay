'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReplayChart } from '@/components/chart/replay-chart';
import { ReplayControls } from '@/components/chart/replay-controls';
import { TradePanel } from '@/components/trade-panel/trade-panel';
import { ChallengeTracker } from '@/components/challenge/challenge-tracker';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  balanceAtom,
  candlesAtom,
  currentIndexAtom,
  equityAtom,
  isPlayingAtom,
  rulesAtom,
  setAccountAtom,
  setDataAtom,
  speedAtom,
  stepForwardAtom,
} from '@/stores/replay-store';
import { FxrIcon } from '@/components/dashboard/fxr-icon';
import { Candle } from '@/types';
import { useChartTimeTracker } from '@/lib/hooks/use-chart-time-tracker';

function generateSampleCandles(symbol: string): Candle[] {
  const candles: Candle[] = [];
  let price = symbol.includes('XAU') ? 2640.0 : 1.085;
  const now = Math.floor(Date.now() / 1000) - 300 * 3600;

  for (let i = 0; i < 300; i++) {
    const time = now + i * 3600;
    const change = (Math.random() - 0.49) * (symbol.includes('XAU') ? 7.5 : 0.0018);
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * (symbol.includes('XAU') ? 3.0 : 0.0006);
    const low = Math.min(open, close) - Math.random() * (symbol.includes('XAU') ? 3.0 : 0.0006);
    price = close;
    candles.push({ time, open, high, low, close, volume: 100 + Math.floor(Math.random() * 500) });
  }
  return candles;
}

export default function ReplayPage() {
  const router = useRouter();
  const { activeSecondsInSession } = useChartTimeTracker();
  const isPlaying = useAtomValue(isPlayingAtom);
  const speed = useAtomValue(speedAtom);
  const currentIndex = useAtomValue(currentIndexAtom);
  const candles = useAtomValue(candlesAtom);
  const balance = useAtomValue(balanceAtom);
  const equity = useAtomValue(equityAtom);
  const rules = useAtomValue(rulesAtom);
  const stepForward = useSetAtom(stepForwardAtom);
  const setData = useSetAtom(setDataAtom);
  const setAccount = useSetAtom(setAccountAtom);

  const [activeSymbol, setActiveSymbol] = useState('XAUUSD');
  const [activeTf, setActiveTf] = useState('1H');

  // Auto seed candles if empty
  useEffect(() => {
    if (candles.length === 0) {
      const sample = generateSampleCandles(activeSymbol);
      if (!rules) {
        setAccount({
          balance: 50000,
          rules: {
            profitTarget: 10,
            maxDailyDrawdown: 5,
            maxOverallDrawdown: 10,
            minTradingDays: 5,
          },
        });
      }
      setData(sample);
    }
  }, [candles.length, activeSymbol, setData, rules, setAccount]);

  // Replay interval
  useEffect(() => {
    if (!isPlaying) return;
    if (currentIndex >= candles.length - 1) return;

    const timer = setTimeout(() => {
      stepForward();
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, speed, currentIndex, stepForward, candles.length]);

  const pnl = equity - balance;

  return (
    <div className="h-screen w-full flex flex-col bg-[#030303] text-white select-none overflow-hidden">
      {/* Replay Top Bar */}
      <header className="h-14 border-b border-[#1b2433] bg-[#090d14] px-4 flex items-center justify-between z-20">
        {/* Left: Back button + Symbol + Timeframe */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#121824] hover:bg-[#1b2433] text-gray-300 hover:text-white text-xs font-medium transition-colors"
          >
            <i className="pi pi-arrow-left text-xs" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-[#1b2433]" />

          {/* Symbol Selector */}
          <div className="flex items-center gap-2">
            <span className="font-lato font-bold text-sm tracking-wide text-white">
              {activeSymbol}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#2C7BFD]/20 text-[#80AFFE]">
              REPLAY
            </span>
          </div>

          <div className="h-4 w-px bg-[#1b2433]" />

          {/* Timeframe pills */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-semibold">
            {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTf(tf)}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTf === tf
                    ? 'bg-[#2C7BFD] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#121824]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Live Replay & Active Chart Time */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="text-gray-400 font-medium">
              {currentIndex >= 0 && candles[currentIndex]
                ? new Date(candles[currentIndex].time * 1000).toUTCString()
                : 'Initializing...'}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono"
            title="Time actively spent on charts is persisted to SQLite & Firebase Storage in real time"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              Chart Time: {Math.floor(activeSecondsInSession / 60)}m {activeSecondsInSession % 60}s
            </span>
          </div>
        </div>

        {/* Right: Balance & Equity */}
        <div className="flex items-center gap-4 text-xs font-lato">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-gray-400 block text-[10px]">BALANCE</span>
              <span className="font-bold text-gray-200">${balance.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">EQUITY</span>
              <span className="font-bold text-white">${equity.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">P&L</span>
              <span
                className={`font-bold ${
                  pnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
                }`}
              >
                {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chart + Bottom Controls */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <ReplayChart />
          </div>
          <div className="border-t border-[#1b2433] bg-[#090d14]">
            <ReplayControls />
          </div>
        </div>

        {/* Right: Trade Panel & Challenge Rules */}
        <div className="w-80 border-l border-[#1b2433] bg-[#090d14] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            <TradePanel />
          </div>
          <div className="border-t border-[#1b2433]">
            <ChallengeTracker />
          </div>
        </div>
      </div>
    </div>
  );
}
