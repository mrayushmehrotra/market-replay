'use client';

import React, { useEffect, useState } from 'react';
import { BottomPanelTab } from './types';

interface BottomBarProps {
  onSelectRange: (range: string) => void;
  scaleMode: 'normal' | 'percent' | 'log';
  onToggleScaleMode: (mode: 'normal' | 'percent' | 'log') => void;
  isAutoScaled: boolean;
  onToggleAutoScale: () => void;
  activeBottomTab: BottomPanelTab;
  onToggleBottomTab: (tab: BottomPanelTab) => void;
  isClassicTheme?: boolean;
}

export function BottomBar({
  onSelectRange,
  scaleMode,
  onToggleScaleMode,
  isAutoScaled,
  onToggleAutoScale,
  activeBottomTab,
  onToggleBottomTab,
  isClassicTheme = true,
}: BottomBarProps) {
  const [timeString, setTimeString] = useState('');
  const [activeRange, setActiveRange] = useState('1D');

  const ranges = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timePart = now.toTimeString().split(' ')[0];
      const offsetMin = -now.getTimezoneOffset();
      const offsetSign = offsetMin >= 0 ? '+' : '-';
      const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
      const offsetMinutes = Math.abs(offsetMin) % 60;
      const tzPart = `UTC${offsetSign}${offsetHours}${offsetMinutes > 0 ? `:${offsetMinutes}` : ''}`;
      setTimeString(`${timePart} ${tzPart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const themeClasses = isClassicTheme
    ? {
        bar: 'bg-[#e0e3eb] border-[#d1d4dc] text-[#131722]',
        btnHover: 'hover:bg-[#cdd1dc] text-[#131722]',
        btnActive: 'bg-white text-[#2962ff] shadow-sm font-semibold',
        divider: 'bg-[#cbd0db]',
      }
    : {
        bar: 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]',
        btnHover: 'hover:bg-[#2a2e39] text-[#d1d4dc] hover:text-white',
        btnActive: 'bg-[#2962ff]/20 text-[#2962ff] font-semibold',
        divider: 'bg-[#2a2e39]',
      };

  return (
    <div
      className={`h-8 border-t flex items-center justify-between px-2 select-none text-xs z-20 ${themeClasses.bar}`}
    >
      {/* Left: Range Selectors (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All) & Calendar */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {ranges.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setActiveRange(r);
              onSelectRange(r);
            }}
            className={`px-1.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              activeRange === r ? themeClasses.btnActive : themeClasses.btnHover
            }`}
          >
            {r}
          </button>
        ))}

        {/* Go to date calendar button */}
        <button
          type="button"
          title="Go to date..."
          className={`p-1 rounded cursor-pointer ${themeClasses.btnHover}`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="12" height="11" rx="1.5" />
            <line x1="2" y1="6" x2="14" y2="6" />
            <line x1="5" y1="1.5" x2="5" y2="4" />
            <line x1="11" y1="1.5" x2="11" y2="4" />
          </svg>
        </button>

        <div className={`h-3.5 w-px mx-1 ${themeClasses.divider}`} />

        {/* Bottom Panel Tabs (Pine Editor / Strategy Tester / Trading Panel) */}
        <div className="hidden md:flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => onToggleBottomTab(activeBottomTab === 'pine_editor' ? null : 'pine_editor')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              activeBottomTab === 'pine_editor' ? themeClasses.btnActive : themeClasses.btnHover
            }`}
          >
            Pine Editor
          </button>
          <button
            type="button"
            onClick={() => onToggleBottomTab(activeBottomTab === 'strategy_tester' ? null : 'strategy_tester')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              activeBottomTab === 'strategy_tester' ? themeClasses.btnActive : themeClasses.btnHover
            }`}
          >
            Strategy Tester
          </button>
          <button
            type="button"
            onClick={() => onToggleBottomTab(activeBottomTab === 'trading_panel' ? null : 'trading_panel')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              activeBottomTab === 'trading_panel' ? themeClasses.btnActive : themeClasses.btnHover
            }`}
          >
            Trading Panel
          </button>
        </div>
      </div>

      {/* Right: Clock/Timezone, % mode, log mode, auto scale */}
      <div className="flex items-center gap-1.5 flex-shrink-0 font-mono text-[11px]">
        {/* Real-time Clock */}
        <span className="opacity-80 px-1">{timeString || '16:33:19 UTC+5:30'}</span>

        <div className={`h-3.5 w-px mx-0.5 ${themeClasses.divider}`} />

        {/* % Percentage toggle */}
        <button
          type="button"
          onClick={() => onToggleScaleMode(scaleMode === 'percent' ? 'normal' : 'percent')}
          title="Percentage Scale Mode"
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            scaleMode === 'percent' ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          %
        </button>

        {/* log Logarithmic toggle */}
        <button
          type="button"
          onClick={() => onToggleScaleMode(scaleMode === 'log' ? 'normal' : 'log')}
          title="Logarithmic Scale Mode"
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            scaleMode === 'log' ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          log
        </button>

        {/* auto Auto Scale toggle */}
        <button
          type="button"
          onClick={onToggleAutoScale}
          title="Auto (Fits Data to Screen)"
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            isAutoScaled ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          auto
        </button>
      </div>
    </div>
  );
}
