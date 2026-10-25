'use client';

import React from 'react';
import { FxrIcon } from './fxr-icon';

interface ActionButtonsProps {
  onStartBacktest: () => void;
  onStartPropFirm: () => void;
  onOpenTutorials: () => void;
}

export function ActionButtons({
  onStartBacktest,
  onStartPropFirm,
  onOpenTutorials,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 w-full overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible no-scrollbar">
      {/* 1. Backtesting Session Button */}
      <button
        type="button"
        onClick={onStartBacktest}
        className="relative min-w-[160px] md:w-[240px] rounded-2xl border border-solid p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F78FF]/60 cursor-pointer bg-white dark:bg-[#030303] hover:border-[#2F78FF] hover:shadow-lg hover:shadow-blue-500/5 group"
        style={{ borderColor: '#2C7BFD' }}
      >
        <div className="flex flex-col gap-1.5 md:gap-3.5 items-start sm:flex-row sm:items-center">
          <div className="flex w-full items-start justify-between sm:w-auto sm:justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <i className="pi pi-plus" style={{ fontSize: '18px', color: '#2C7BFD' }} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-0.5 whitespace-normal">
            <div className="flex items-center gap-1.5">
              <span className="text-sm md:text-base font-bold font-lato text-[#111827] dark:text-white group-hover:text-[#2C7BFD] transition-colors">
                Backtesting session
              </span>
              <span className="hidden sm:inline-flex items-center">
                <FxrIcon icon="information-line" size={14} color="#8A9099" />
              </span>
            </div>
            <span className="text-xs md:text-sm text-[#6B7280] dark:text-[#8A9099]">
              Start a session
            </span>
          </div>
        </div>
      </button>

      {/* 2. Prop Firm Session Button */}
      <button
        type="button"
        onClick={onStartPropFirm}
        aria-label="Start a prop firm simulation session with challenge rules."
        className="relative min-w-[160px] md:w-[240px] rounded-2xl border border-solid p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F78FF]/60 cursor-pointer bg-white dark:bg-[#030303] hover:border-[#2F78FF] hover:shadow-lg hover:shadow-blue-500/5 group"
        style={{ borderColor: '#1B2433' }}
      >
        <div className="flex flex-col gap-1.5 md:gap-3.5 items-start sm:flex-row sm:items-center">
          <div className="flex w-full items-start justify-between sm:w-auto sm:justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <i className="pi pi-trophy" style={{ fontSize: '18px', color: '#2C7BFD' }} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-0.5 whitespace-normal">
            <div className="flex items-center gap-1.5">
              <span className="text-sm md:text-base font-bold font-lato text-[#111827] dark:text-white group-hover:text-[#2C7BFD] transition-colors">
                Prop firm session
              </span>
              <span className="hidden sm:inline-flex items-center">
                <FxrIcon icon="information-line" size={14} color="#8A9099" />
              </span>
            </div>
            <span className="text-xs md:text-sm text-[#6B7280] dark:text-[#8A9099]">
              Start a challenge
            </span>
          </div>
        </div>
      </button>

      {/* 3. Tutorials Button */}
      <button
        type="button"
        onClick={onOpenTutorials}
        className="relative min-w-[160px] md:w-[240px] rounded-2xl border border-solid p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F78FF]/60 cursor-pointer bg-white dark:bg-[#030303] hover:border-[#2F78FF] hover:shadow-lg hover:shadow-blue-500/5 group"
        style={{ borderColor: '#1B2433' }}
      >
        <div className="flex flex-col gap-1.5 md:gap-3.5 items-start sm:flex-row sm:items-center">
          <div className="flex w-full items-start justify-between sm:w-auto sm:justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <i className="pi pi-graduation-cap" style={{ fontSize: '18px', color: '#2C7BFD' }} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-0.5 whitespace-normal">
            <div className="flex items-center gap-1.5">
              <span className="text-sm md:text-base font-bold font-lato text-[#111827] dark:text-white group-hover:text-[#2C7BFD] transition-colors">
                Tutorials
              </span>
              <span className="hidden sm:inline-flex items-center">
                <FxrIcon icon="information-line" size={14} color="#8A9099" />
              </span>
            </div>
            <span className="text-xs md:text-sm text-[#6B7280] dark:text-[#8A9099]">
              Learn more
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
