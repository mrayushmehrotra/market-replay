'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FxrIcon } from './fxr-icon';
import { useSetAtom } from 'jotai';
import { setAccountAtom, setDataAtom } from '@/stores/replay-store';
import { Candle } from '@/types';

import { SessionData } from '@/types/dashboard';
import { useDashboardData } from '@/lib/hooks/use-dashboard-data';

export type { SessionData };

const DEFAULT_SESSIONS: SessionData[] = [
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

// Generate sample candles if none are present in store
function generateSampleCandles(symbol: string): Candle[] {
  const candles: Candle[] = [];
  let price = symbol.includes('XAU') ? 2650.0 : 1.085;
  const now = Math.floor(Date.now() / 1000) - 200 * 3600;

  for (let i = 0; i < 200; i++) {
    const time = now + i * 3600;
    const change = (Math.random() - 0.49) * (symbol.includes('XAU') ? 8.0 : 0.002);
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * (symbol.includes('XAU') ? 3.0 : 0.0008);
    const low = Math.min(open, close) - Math.random() * (symbol.includes('XAU') ? 3.0 : 0.0008);
    price = close;
    candles.push({ time, open, high, low, close, volume: 100 + Math.floor(Math.random() * 500) });
  }
  return candles;
}

interface SessionsBrowserProps {
  onOpenSummary: (session: SessionData) => void;
  onOpenSettings: (session: SessionData) => void;
  onOpenAnalytics: (session: SessionData) => void;
}

export function SessionsBrowser({
  onOpenSummary,
  onOpenSettings,
  onOpenAnalytics,
}: SessionsBrowserProps) {
  const router = useRouter();
  const setData = useSetAtom(setDataAtom);
  const setAccount = useSetAtom(setAccountAtom);
  const { data, duplicateSession, deleteSession } = useDashboardData();
  const sessions: SessionData[] = data?.sessions && data.sessions.length > 0 ? data.sessions : DEFAULT_SESSIONS;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'balance'>('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleResumeSession = (session: SessionData) => {
    // Populate store with candles & balance
    const candles = generateSampleCandles(session.symbol);
    const numBalance = parseFloat(session.balance.replace(/[$,]/g, '')) || 50000;
    setAccount({
      balance: numBalance,
      rules: {
        profitTarget: 10,
        maxDailyDrawdown: 5,
        maxOverallDrawdown: 10,
        minTradingDays: 5,
      },
    });
    setData(candles);
    router.push('/backtest/replay');
  };

  const handleDuplicate = (session: SessionData, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateSession(session);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSession(id);
    }
  };

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredSessions = sessions
    .filter(
      (s: SessionData) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: SessionData, b: SessionData) => {
      if (sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (sortBy === 'balance') {
        const balA = parseFloat(a.balance.replace(/[$,]/g, ''));
        const balB = parseFloat(b.balance.replace(/[$,]/g, ''));
        return balB - balA;
      }
      return 0; // default newest
    });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-xl font-bold font-lato text-gray-900 dark:text-white">
        Recent Sessions
      </h3>

      {/* Filter and Search Bar */}
      <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Search input */}
        <div className="w-full sm:max-w-md relative">
          <div className="flex gap-3 items-center border rounded-xl bg-white dark:bg-fxr-bg-primary-dark border-gray-200 dark:border-fxr-border-tertiary-dark hover:border-gray-300 dark:hover:border-fxr-border-primary-dark transition-colors px-3 h-11">
            <FxrIcon icon="search-line" size={16} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Here"
              className="w-full bg-transparent text-sm text-fxr-text-primary dark:text-fxr-text-primary-dark placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
          {/* Filter button */}
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Toggle filters"
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-fxr-border-tertiary-dark bg-white dark:bg-[#121824] hover:bg-gray-50 dark:hover:bg-[#1a2333] transition-colors cursor-pointer text-gray-700 dark:text-gray-300 shadow-xs"
          >
            <FxrIcon icon="filter-line" size={16} />
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-gray-200 dark:border-fxr-border-tertiary-dark bg-white dark:bg-[#121824] hover:bg-gray-50 dark:hover:bg-[#1a2333] transition-colors cursor-pointer text-xs sm:text-sm text-gray-800 dark:text-gray-200 shadow-xs"
            >
              <i className="pi pi-sort-alt text-gray-400" />
              <span>
                {sortBy === 'newest'
                  ? 'Newest to oldest'
                  : sortBy === 'oldest'
                  ? 'Oldest to newest'
                  : 'Highest balance'}
              </span>
              <FxrIcon icon="arrow-down-s-line" size={14} className="text-gray-400" />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#0d121c] border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-xl shadow-xl py-1 z-50 text-xs">
                {[
                  { id: 'newest', label: 'Newest to oldest' },
                  { id: 'oldest', label: 'Oldest to newest' },
                  { id: 'balance', label: 'Highest balance' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortBy(opt.id as 'newest' | 'oldest' | 'balance');
                      setSortOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 font-medium cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sessions Count & Progress Bar */}
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 my-1">
        <span className="text-xs sm:text-sm text-gray-500 dark:text-fxr-text-secondary-dark font-medium">
          {filteredSessions.length} out of {sessions.length} sessions
        </span>
        <div className="w-full sm:w-[140px] h-2 bg-gray-200 dark:bg-[#1b2433] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2C7BFD] rounded-full transition-all duration-300"
            style={{ width: `${(filteredSessions.length / Math.max(1, sessions.length)) * 100}%` }}
          />
        </div>
      </div>

      {/* Session Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSessions.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-fxr-text-secondary-dark border border-dashed border-gray-300 dark:border-fxr-border-tertiary-dark rounded-2xl">
            No sessions match your search.
          </div>
        ) : (
          filteredSessions.map((session: SessionData) => {
            const isExpanded = expandedId === session.id;

            return (
              <div
                key={session.id}
                className="border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl bg-white dark:bg-[#090a0f] overflow-hidden transition-all duration-200 shadow-xs hover:border-[#2C7BFD]/60"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleAccordion(session.id)}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  {/* Left: Play button + Info */}
                  <div className="flex items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
                    {/* Resume Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResumeSession(session);
                      }}
                      title="Resume session"
                      className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full hover:scale-105 active:scale-95 transition-all text-[#2C7BFD] hover:text-[#2576fd] cursor-pointer"
                    >
                      <FxrIcon icon="play-circle-fill" size={38} color="#2C7BFD" />
                    </button>

                    {/* Meta details */}
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {session.name}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-[6px] border border-[#2C7BFD]/40 text-[#80AFFE] bg-[rgba(44,123,253,0.18)] text-[10px] px-1.5 py-0.5 font-medium">
                          <FxrIcon icon="flashlight-line" size={10} color="#80AFFE" />
                          <span>{session.retentionDays}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-fxr-text-secondary-dark flex-wrap">
                        <span className="flex items-center gap-1">
                          <FxrIcon icon="calendar-line" size={13} className="text-gray-400" />
                          {session.dateRange}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                          <FxrIcon icon="money-bill" size={13} className="text-gray-400" />
                          {session.balance}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-[#1b2433] text-gray-700 dark:text-gray-300 font-semibold text-[11px]">
                          {session.symbol}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Progress bar + Actions + Chevron */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end w-full lg:w-auto gap-3 sm:gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-fxr-border-tertiary-dark">
                    {/* Days Progress Bar */}
                    <div className="w-full sm:w-40 flex flex-col gap-1">
                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#1b2433] overflow-hidden">
                        <div
                          className="h-full bg-[#22c55e] rounded-full"
                          style={{ width: `${session.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-500 dark:text-fxr-text-secondary-dark font-medium">
                        Remaining days: {session.remainingDays}
                      </span>
                    </div>

                    {/* Action Buttons row */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Summary button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSummary(session);
                        }}
                        title="View session summary"
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-fxr-btn-bg-secondary-active-dark hover:bg-gray-200 dark:hover:bg-fxr-btn-bg-secondary-hover-dark text-gray-800 dark:text-white transition-colors cursor-pointer"
                      >
                        Summary
                      </button>

                      {/* Analytics button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAnalytics(session);
                        }}
                        title="View session analytics"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-fxr-btn-bg-secondary-active-dark hover:bg-gray-200 dark:hover:bg-fxr-btn-bg-secondary-hover-dark text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                      >
                        <FxrIcon icon="bar-chart-fill" size={15} />
                      </button>

                      {/* Settings / Edit button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSettings(session);
                        }}
                        title="Session settings"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-fxr-btn-bg-secondary-active-dark hover:bg-gray-200 dark:hover:bg-fxr-btn-bg-secondary-hover-dark text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                      >
                        <FxrIcon icon="edit-line" size={15} />
                      </button>

                      {/* Duplicate button */}
                      <button
                        type="button"
                        onClick={(e) => handleDuplicate(session, e)}
                        title="Duplicate session"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-fxr-btn-bg-secondary-active-dark hover:bg-gray-200 dark:hover:bg-fxr-btn-bg-secondary-hover-dark text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                      >
                        <FxrIcon icon="file-copy-line" size={15} />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(session.id, e)}
                        title="Delete session"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-fxr-btn-bg-secondary-active-dark hover:bg-red-500/20 text-[#ef4444] transition-colors cursor-pointer"
                      >
                        <FxrIcon icon="delete-bin-line" size={15} color="#ef4444" />
                      </button>

                      {/* Accordion Chevron */}
                      <div className="w-6 h-6 flex items-center justify-center text-gray-400">
                        <span
                          className={`pi pi-chevron-down text-xs transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Accordion Body */}
                {isExpanded && (
                  <div className="px-6 py-5 border-t border-gray-100 dark:border-fxr-border-tertiary-dark bg-gray-50/50 dark:bg-[#07090e] grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Performance</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{session.winRate}</span>
                        <span className="text-xs text-[#22c55e]">Win Rate</span>
                      </div>
                      <span className="text-xs text-gray-400">Total Trades: {session.tradesCount}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Net Profit / Loss</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#22c55e]">{session.netPnl}</span>
                      </div>
                      <span className="text-xs text-gray-400">Profit Factor: {session.profitFactor}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Risk & Drawdown</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{session.maxDrawdown}</span>
                        <span className="text-xs text-gray-400">Max DD</span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleResumeSession(session)}
                          className="px-3 py-1 bg-[#2C7BFD] hover:bg-[#2576fd] text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Launch Replay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
