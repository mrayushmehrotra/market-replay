'use client';

import React from 'react';
import { FxrIcon } from './fxr-icon';

interface DashboardUpgradeBannerProps {
  onUpgradeClick: () => void;
}

export function DashboardUpgradeBanner({ onUpgradeClick }: DashboardUpgradeBannerProps) {
  return (
    <div className="w-full p-2.5 inline-flex justify-center items-center gap-2 border-t-2 border-b-2 dark:border-fxr-text-brand-dark/20 border-blue-200 bg-gradient-to-r dark:from-slate-900/20 dark:via-blue-500/30 dark:to-slate-900/20 from-blue-200/20 via-blue-200/30 to-blue-200/20">
      <div className="w-full max-w-7xl px-4 flex flex-col sm:flex-row justify-center items-center gap-3 text-center sm:text-left">
        <span className="text-fxr-text-primary dark:!text-fxr-text-primary-dark font-medium leading-normal text-xs sm:text-sm">
          Sessions on the Beginner plan are hidden after 1 week. Upgrade to Pro to unlock all your past sessions.
        </span>

        <button
          type="button"
          onClick={onUpgradeClick}
          className="shrink-0 flex items-center gap-1.5 rounded-full border border-[#61646A] py-[5px] px-[12px] font-medium text-xs sm:text-sm text-gray-800 dark:text-white hover:text-white hover:bg-fxr-btn-bg-secondary-hover dark:hover:bg-fxr-btn-bg-secondary-hover-dark transition-colors cursor-pointer shadow-xs"
        >
          <FxrIcon icon="flashlight-line" size={14} color="#ffffff" className="dark:bg-white bg-gray-900" />
          <span>Upgrade</span>
        </button>
      </div>
    </div>
  );
}
