'use client';

import React, { useState } from 'react';
import { useDashboardData } from '@/lib/hooks/use-dashboard-data';
import { FxrIcon } from './fxr-icon';

export function DashboardHeader() {
  const { data, backingUp, triggerStorageBackup } = useDashboardData();
  const [streakOpen, setStreakOpen] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  const handleBackup = async () => {
    try {
      const res = await triggerStorageBackup();
      if (res?.success) {
        setBackupMessage('Synced to Firebase Storage!');
        setTimeout(() => setBackupMessage(null), 3500);
      }
    } catch {
      setBackupMessage('Sync error');
      setTimeout(() => setBackupMessage(null), 3000);
    }
  };

  const streakDays = data.streakDays || 2;

  return (
    <header className="px-6 sm:px-8 pt-6 sm:pt-8 bg-gradient-to-r from-white dark:from-fxr-bg-primary-dark flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl sm:text-4xl font-bold font-lato h-[45px] sm:h-[62px] flex items-center tracking-tight text-gray-900 dark:text-white">
          Testing
        </h1>
      </div>

      <div className="flex items-center justify-end gap-3 relative">
        {/* Firebase Storage Backup & Realtime Status Button */}
        <div className="flex items-center gap-2">
          {data.storageBackupUrl && (
            <a
              href={data.storageBackupUrl}
              download
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title="Download dashboard backup from Firebase Storage"
            >
              <i className="pi pi-download text-xs text-[#2C7BFD]" />
              <span>Export JSON</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleBackup}
            disabled={backingUp}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl border border-sky-500/40 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-medium cursor-pointer transition-colors shadow-xs"
            title="Save complete dashboard state to Firebase Storage"
          >
            <i className={`pi pi-cloud-upload text-sm ${backingUp ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {backingUp ? 'Saving to Storage...' : backupMessage || 'Firebase Storage Sync'}
            </span>
            <span className="sm:hidden">{backingUp ? '...' : 'Sync'}</span>
          </button>
        </div>

        {/* Streak Button */}
        <button
          type="button"
          onClick={() => setStreakOpen(!streakOpen)}
          data-testid="analytics-streak-badge"
          className="rounded-2xl border bg-black/5 dark:bg-white/5 px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-1 sm:gap-[7px] cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors border-orange-500/80 shadow-xs"
        >
          <div className="flex items-center gap-1 sm:gap-[7px] whitespace-nowrap">
            <span className="text-lg sm:text-2xl font-lato font-bold bg-clip-text text-transparent dark:bg-[linear-gradient(162deg,#FFF_33.43%,#808080_88.15%)] bg-[linear-gradient(162deg,#111_33.43%,#555_88.15%)]">
              {streakDays}
            </span>
            <span className="text-xs sm:text-sm font-lato font-semibold text-black dark:text-gray-300">
              <span className="hidden sm:inline">day streak</span>
              <span className="hidden sm:inline">!</span>
            </span>
          </div>
          <span aria-hidden="true" className="text-orange-500 text-lg sm:text-xl">
            🔥
          </span>
        </button>

        {/* Streak Popover */}
        {streakOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 p-4 bg-white dark:bg-[#0e131d] border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <h4 className="font-lato font-bold text-sm text-gray-900 dark:text-white">
                {streakDays} Day Testing Streak!
              </h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-fxr-text-secondary-dark leading-relaxed">
              Backtest every day to sharpen your edge and keep your trading discipline streak alive. All data is saved in real-time in the database & Firebase storage.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1b2433] flex justify-between items-center text-xs text-gray-500">
              <span>Next reward: 7 days</span>
              <span className="text-[#2C7BFD] font-semibold">{Math.max(0, 7 - streakDays)} days left</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
