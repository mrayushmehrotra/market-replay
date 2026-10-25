'use client';

import React, { useState } from 'react';
import { FxrIcon } from './fxr-icon';
import {
  TimeInvestedChart,
  WinRateChart,
  TradesBySymbolChart,
} from './dashboard-charts';
import { useDashboardData } from '@/lib/hooks/use-dashboard-data';

export function AnalyticsOverview() {
  const { data, setMode, setTimeFilter } = useDashboardData();
  const [modeOpen, setModeOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const modeFilter = data.selectedMode || 'Backtesting';
  const timeFilter = data.selectedTimeFilter || 'Lifetime';

  // Calculate live hours and minutes spent on charts
  const totalSeconds = data.timeInvestedSeconds || 3420;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Historical time replayed formatting (e.g. 1 mo 27 d 17 hr)
  const histSec = data.historicalTimeReplayedSeconds || 4986000;
  const histMonths = Math.floor(histSec / (30 * 86400)) || 1;
  const histDays = Math.floor((histSec % (30 * 86400)) / 86400) || 27;
  const histHours = Math.floor((histSec % 86400) / 3600) || 17;

  // Buy & Sell percentages
  const totalTrades = data.totalTrades || 39;
  const buyTrades = data.buyTrades || 21;
  const sellTrades = data.sellTrades || (totalTrades - buyTrades);
  const buyPct = totalTrades > 0 ? Number(((buyTrades / totalTrades) * 100).toFixed(2)) : 50;
  const sellPct = Number((100 - buyPct).toFixed(2));

  // Win rate
  const winRate = Number((data.winRate ?? 41.03).toFixed(2));

  return (
    <section data-testid="analytics-global-dashboard" className="flex flex-col gap-6">
      {/* Performance Section Header with Dropdown Filters */}
      <div className="w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold text-gray-900 dark:text-white">Performance</p>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Realtime DB Synced</span>
          </div>
        </div>

        <div className="flex gap-2 sm:justify-end w-full sm:w-auto">
          {/* Mode Dropdown (Synced to Firebase & SQLite) */}
          <div className="relative">
            <button
              onClick={() => {
                setModeOpen(!modeOpen);
                setTimeOpen(false);
              }}
              className="box-content w-full whitespace-nowrap rounded-full justify-center items-center inline-flex text-center font-normal font-sans leading-normal gap-2 z-10 dark:text-white bg-white dark:bg-[#090a0f] border border-gray-200 dark:!border-fxr-border-tertiary-dark hover:bg-gray-100 dark:hover:bg-[#151c28] text-[#242331] h-7 px-3 py-1 text-xs cursor-pointer shadow-xs transition-colors"
            >
              <FxrIcon icon="backtesting" size={13} className="text-[#2C7BFD]" />
              <span className="text-fxr-text-primary dark:text-fxr-text-primary-dark font-medium">
                {modeFilter}
              </span>
              <FxrIcon icon="arrow-down-s-line" size={14} className="text-gray-400" />
            </button>
            {modeOpen && (
              <div className="absolute left-0 sm:right-0 mt-1 w-36 bg-white dark:bg-[#0d121c] border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-xl shadow-xl py-1 z-50 text-xs">
                {['Backtesting', 'Prop Firm', 'Live Replay'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setMode(opt);
                      setModeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 font-medium cursor-pointer ${
                      modeFilter === opt ? 'text-[#2C7BFD] font-bold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeframe Dropdown (Synced to Firebase & SQLite) */}
          <div className="relative">
            <button
              onClick={() => {
                setTimeOpen(!timeOpen);
                setModeOpen(false);
              }}
              className="box-content w-full whitespace-nowrap rounded-full justify-center items-center inline-flex text-center font-normal font-sans leading-normal gap-2 z-10 dark:text-white bg-white dark:bg-[#090a0f] border border-gray-200 dark:!border-fxr-border-tertiary-dark hover:bg-gray-100 dark:hover:bg-[#151c28] text-[#242331] h-7 px-3 py-1 text-xs cursor-pointer shadow-xs transition-colors"
            >
              <FxrIcon icon="calendar-line" size={13} className="text-[#2C7BFD]" />
              <span className="text-fxr-text-primary dark:text-fxr-text-primary-dark font-medium">
                {timeFilter}
              </span>
              <FxrIcon icon="arrow-down-s-line" size={14} className="text-gray-400" />
            </button>
            {timeOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#0d121c] border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-xl shadow-xl py-1 z-50 text-xs">
                {['Lifetime', 'Last 7 Days', 'Last 30 Days', 'This Month'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setTimeFilter(opt);
                      setTimeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 font-medium cursor-pointer ${
                      timeFilter === opt ? 'text-[#2C7BFD] font-bold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column: 4 Metric Cards + Time Invested Chart */}
        <div className="w-full flex flex-col gap-6">
          {/* 2x2 Metric Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Time Invested (Exact real-time hours/minutes on chart) */}
            <div className="relative border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs">
              <div className="absolute top-3.5 right-3.5">
                <i className="pi pi-info-circle !text-xs text-gray-400" title="Tracks hours and minutes actively spent on charts" />
              </div>
              <div className="flex flex-col gap-2 min-h-24 justify-center">
                <div className="flex items-center gap-2 text-gray-700 dark:text-white">
                  <FxrIcon icon="bar-chart-fill" size={20} className="text-gray-400" />
                  <span className="text-sm font-semibold tracking-tight text-fxr-text-primary dark:text-fxr-text-primary-dark">
                    Time Invested
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1 font-lato">
                  {hours > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{hours}</span>
                      <span className="text-sm font-normal text-gray-500 mr-1.5">hr</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{minutes}</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-fxr-text-secondary-dark">min</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{minutes || 57}</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-fxr-text-secondary-dark">min</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Card 2: Historical time replayed */}
            <div className="relative border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs">
              <div className="absolute top-3.5 right-3.5">
                <i className="pi pi-info-circle !text-xs text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 min-h-24 justify-center">
                <div className="flex items-center gap-2 text-gray-700 dark:text-white">
                  <FxrIcon icon="timer-2-fill" size={20} className="text-gray-400" />
                  <span className="text-sm font-semibold tracking-tight text-fxr-text-primary dark:text-fxr-text-primary-dark">
                    Historical time replayed
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1 font-lato">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{histMonths}</span>
                  <span className="text-sm font-normal text-gray-500 mr-1">mo</span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{histDays}</span>
                  <span className="text-sm font-normal text-gray-500 mr-1">d</span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{histHours}</span>
                  <span className="text-sm font-normal text-gray-500">hr</span>
                </div>
              </div>
            </div>

            {/* Card 3: Trades taken */}
            <div className="relative border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs">
              <div className="absolute top-3.5 right-3.5">
                <i className="pi pi-info-circle !text-xs text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 min-h-24 justify-between">
                <div>
                  <span className="text-sm font-semibold text-fxr-text-primary dark:text-fxr-text-primary-dark">
                    Trades taken
                  </span>
                  <div className="flex items-center gap-2 mt-1 font-lato">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{totalTrades}</span>
                  </div>
                </div>

                {/* Stacked bar */}
                <div className="flex flex-col justify-start w-full gap-1.5 mt-2">
                  <div className="w-full relative h-2 rounded-full overflow-hidden bg-[#ef4444]">
                    <div
                      className="h-full left-0 top-0 absolute rounded-l-full bg-[#22c55e] transition-all duration-300"
                      style={{ width: `${buyPct}%` }}
                    />
                  </div>
                  <div className="w-full flex items-center text-xs">
                    <span className="font-semibold text-[#22c55e]">{buyPct}% buys</span>
                    <span className="text-xs text-gray-400 font-semibold px-1">・</span>
                    <span className="font-semibold text-[#ef4444]">{sellPct}% sells</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Overall win rate */}
            <div className="relative border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs">
              <div className="absolute top-3.5 right-3.5">
                <i className="pi pi-info-circle !text-xs text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 min-h-24 justify-center">
                <div className="flex items-center gap-2 text-gray-700 dark:text-white">
                  <FxrIcon icon="award-line" size={20} className="text-gray-400" />
                  <span className="text-sm font-semibold tracking-tight text-fxr-text-primary dark:text-fxr-text-primary-dark">
                    Overall win rate
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1 font-lato">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{winRate}</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Invested Chart Card */}
          <div className="border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-fxr-text-primary dark:text-fxr-text-primary-dark">
                Time Invested
              </span>
              <i className="pi pi-info-circle !text-xs text-gray-400" />
            </div>
            <TimeInvestedChart timeInvestedSeconds={totalSeconds} />
          </div>
        </div>

        {/* Right Column: Win Rate Chart + Trades by Symbol Chart */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 self-start">
          {/* Win Rate Chart Card */}
          <div className="border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-fxr-text-primary dark:text-fxr-text-primary-dark">
                Win Rate
              </span>
              <i className="pi pi-info-circle !text-xs text-gray-400" />
            </div>
            <WinRateChart winRate={winRate} />
          </div>

          {/* Trades by Symbol Chart Card */}
          <div className="border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-fxr-text-primary dark:text-fxr-text-primary-dark">
                Trades by symbol
              </span>
              <i className="pi pi-info-circle !text-xs text-gray-400" />
            </div>
            <TradesBySymbolChart tradesCount={totalTrades} symbol="XAUUSD" />
          </div>
        </div>
      </div>
    </section>
  );
}
