'use client';

import React from 'react';
import {
  IconCandlesticks,
  IconCompare,
  IconIndicatorsFx,
  IconAlerts,
  IconCloudSave,
  IconCamera,
  TvLogo,
} from './icons';
import { ChartTheme, ChartType, Timeframe } from './types';

interface TopBarProps {
  symbol: string;
  onOpenSymbolSearch: () => void;
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  chartType: ChartType;
  onChangeChartType: (type: ChartType) => void;
  onOpenIndicators: () => void;
  onOpenSettings: () => void;
  isReplayActive: boolean;
  onToggleReplay: () => void;
  onToggleFullscreen: () => void;
  onTakeScreenshot: () => void;
  theme: ChartTheme;
  onToggleTheme: () => void;
  onQuickTrade?: () => void;
}

export function TopBar({
  symbol,
  onOpenSymbolSearch,
  timeframe,
  onChangeTimeframe,
  chartType,
  onChangeChartType,
  onOpenIndicators,
  onOpenSettings,
  isReplayActive,
  onToggleReplay,
  onToggleFullscreen,
  onTakeScreenshot,
  theme,
  onToggleTheme,
  onQuickTrade,
}: TopBarProps) {
  const timeframes: Timeframe[] = ['1m', '3m', '5m', '15m', '30m', '1h', '4h', 'D', 'W'];

  const isClassic = theme === 'classic';

  const themeClasses = isClassic
    ? {
        header: 'bg-[#e0e3eb] border-[#d1d4dc] text-[#131722]',
        buttonHover: 'hover:bg-[#cdd1dc] text-[#131722]',
        buttonActive: 'bg-white text-[#2962ff] shadow-sm font-semibold',
        divider: 'bg-[#cbd0db]',
        tradeBtn: 'bg-white hover:bg-[#f0f3fa] text-[#131722] border-[#c5c8cf]',
      }
    : {
        header: 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]',
        buttonHover: 'hover:bg-[#2a2e39] text-[#d1d4dc] hover:text-white',
        buttonActive: 'bg-[#2962ff]/20 text-[#2962ff] font-semibold',
        divider: 'bg-[#2a2e39]',
        tradeBtn: 'bg-[#121824] hover:bg-[#1b2433] text-white border-[#2a2e39]',
      };

  return (
    <header
      className={`h-11 border-b flex items-center justify-between px-2 select-none z-30 transition-colors ${themeClasses.header}`}
    >
      {/* Left Section: Avatar, Symbol, Compare, Timeframes, Chart Type, Indicators */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {/* User Avatar with Badge 11 */}
        <div className="relative flex-shrink-0 cursor-pointer mr-1">
          <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold">
            E
          </div>
          <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-white">
            11
          </span>
        </div>

        {/* Symbol Search Button */}
        <button
          type="button"
          onClick={onOpenSymbolSearch}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold tracking-wide transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <span>{symbol}</span>
          <span className="text-[9px] opacity-70">▾</span>
        </button>

        {/* Compare Symbol Icon */}
        <button
          type="button"
          onClick={onOpenSymbolSearch}
          title="Compare or Add Symbol"
          className={`p-1.5 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <IconCompare className="w-4 h-4" />
        </button>

        <div className={`h-4 w-px mx-1 ${themeClasses.divider}`} />

        {/* Timeframes Bar */}
        <div className="flex items-center gap-0.5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => onChangeTimeframe(tf)}
              className={`px-1.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                timeframe === tf ? themeClasses.buttonActive : themeClasses.buttonHover
              }`}
            >
              {tf}
            </button>
          ))}
          <button
            type="button"
            className={`px-1 py-1 rounded text-[10px] opacity-60 hover:opacity-100 ${themeClasses.buttonHover}`}
          >
            ▾
          </button>
        </div>

        <div className={`h-4 w-px mx-1 ${themeClasses.divider}`} />

        {/* Chart Style (Candles) */}
        <button
          type="button"
          onClick={() => {
            const nextType: ChartType = chartType === 'candles' ? 'line' : chartType === 'line' ? 'area' : 'candles';
            onChangeChartType(nextType);
          }}
          title={`Chart Type: ${chartType}`}
          className={`flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <IconCandlesticks className="w-4 h-4" />
          <span className="text-[9px] opacity-70">▾</span>
        </button>

        <div className={`h-4 w-px mx-1 ${themeClasses.divider}`} />

        {/* Indicators Button */}
        <button
          type="button"
          onClick={onOpenIndicators}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <IconIndicatorsFx className="w-4 h-4 text-[#2962ff]" />
          <span>Indicators</span>
        </button>

        {/* Create Alert */}
        <button
          type="button"
          title="Create Alert"
          className={`p-1.5 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <IconAlerts className="w-4 h-4" />
        </button>

        {/* Bar Replay Button */}
        <button
          type="button"
          onClick={onToggleReplay}
          title="Bar Replay Mode"
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
            isReplayActive
              ? 'bg-[#2962ff] text-white font-semibold'
              : themeClasses.buttonHover
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a6 6 0 106 6h-2a4 4 0 11-4-4v3l-4-4 4-4v3z" />
          </svg>
          <span className="hidden sm:inline">Replay</span>
        </button>
      </div>

      {/* Right Section: Layout, Settings, Fullscreen, Screenshot, Theme, Trade, Upgrade */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
        {/* Layout Save Cloud */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-[#cdd1dc] dark:hover:bg-[#2a2e39] cursor-pointer">
          <IconCloudSave className="w-4 h-4 text-[#2962ff]" />
          <span className="font-medium">Unnamed</span>
          <span className="text-[9px] opacity-60">▾</span>
        </div>

        {/* Theme Toggle (Classic vs Dark) */}
        <button
          type="button"
          onClick={onToggleTheme}
          title={`Switch Theme (Current: ${theme})`}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          {isClassic ? '🌙 Dark' : '☀️ Classic'}
        </button>

        {/* Settings Gear */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Chart Settings"
          className={`p-1.5 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="10" r="3" />
            <path d="M10 2v2m0 12v2M2 10h2m12 0h2m-2.8-5.2l-1.4 1.4m-8.6 8.6l-1.4 1.4m11.4 0l-1.4-1.4m-8.6-8.6L4.2 4.8" />
          </svg>
        </button>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          title="Fullscreen Mode"
          className={`p-1.5 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4" />
          </svg>
        </button>

        {/* Camera / Screenshot */}
        <button
          type="button"
          onClick={onTakeScreenshot}
          title="Take Snapshot"
          className={`p-1.5 rounded transition-colors cursor-pointer ${themeClasses.buttonHover}`}
        >
          <IconCamera className="w-4 h-4" />
        </button>

        <div className={`h-4 w-px mx-1 ${themeClasses.divider}`} />

        {/* Trade Button */}
        <button
          type="button"
          onClick={onQuickTrade}
          className={`px-3 py-1 rounded text-xs font-semibold border transition-all cursor-pointer ${themeClasses.tradeBtn}`}
        >
          Trade
        </button>

        {/* Upgrade Button (Vibrant Gradient pill) */}
        <button
          type="button"
          className="px-3.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2962ff] to-[#7c3aed] hover:from-[#1e4bd8] hover:to-[#6d28d9] shadow-sm transition-all cursor-pointer"
        >
          Upgrade
        </button>
      </div>
    </header>
  );
}
