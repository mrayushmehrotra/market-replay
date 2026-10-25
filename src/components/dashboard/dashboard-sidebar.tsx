'use client';

import React from 'react';
import Link from 'next/link';
import { FxrIcon } from './fxr-icon';
import { useAuth } from '@/components/auth/auth-provider';

interface DashboardSidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
  onOpenSettings?: () => void;
}

export function DashboardSidebar({
  isOpen,
  onCloseMobile,
  onOpenSettings,
}: DashboardSidebarProps) {
  const { user } = useAuth();
  const userName = user?.displayName || 'Elliot Alderson';
  const userPhoto = user?.photoURL || 'https://lh3.googleusercontent.com/a/ACg8ocKefjpIyCRWjHfx0EK8No3dZMe4QEufXgcY3vE41OnqJV5p8w=s96-c';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 bg-black/60 z-[99] backdrop-blur-xs"
        />
      )}

      <aside
        className={`z-[100] opacity-100 !transition-all duration-300 ease-in-out lg:sticky max-lg:fixed sidebar-container lg:top-0 max-lg:top-20 self-start max-lg:w-72 lg:w-64 border-r border-fxr-border-tertiary dark:border-fxr-border-tertiary-dark h-full bg-fxr-bg-primary dark:bg-fxr-bg-primary-dark ${
          isOpen ? 'translate-x-0' : 'max-lg:-translate-x-full lg:w-0 lg:border-none lg:overflow-hidden'
        }`}
      >
        <div className="h-full overflow-y-auto p-4 bg-fxr-bg-primary dark:bg-fxr-bg-primary-dark flex flex-col justify-between gap-4 text-zinc-800 dark:text-white no-scrollbar">
          {/* Top content */}
          <div className="w-full grow shrink-0">
            {/* Profile Preview */}
            <div className="relative border-b border-fxr-border-tertiary dark:border-fxr-border-tertiary-dark flex flex-col items-center pb-4 w-full">
              <div className="relative cursor-pointer group">
                <div className="relative">
                  <div className="flex justify-center items-center">
                    <img
                      alt="Avatar"
                      src={userPhoto}
                      className="!transition-none duration-300 ease-in-out w-16 h-16 rounded-full object-cover border border-[#1b2433]"
                    />
                    {/* Anchored Tier Badge */}
                    <div className="absolute top-[-7px] -right-5 flex items-start">
                      <span className="p-tag flex items-center justify-center gap-1 rounded-[6px] border-2 border-white dark:border-[#030303] text-[#80AFFE] backdrop-blur-[12px] !text-[10px] font-inter !py-0.5 !px-2 bg-[rgba(44,123,253,0.25)] shadow-xs">
                        <span>Free</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="!transition-none duration-300 ease-in-out text-fxr-text-primary dark:text-fxr-text-primary-dark text-base font-semibold leading-normal mt-2 max-h-12 opacity-100 overflow-hidden w-full text-center truncate">
                {userName}
              </span>
            </div>

            {/* Main Navigation Items */}
            <div className="flex flex-col gap-2 py-4 border-b border-fxr-border-tertiary dark:border-fxr-border-tertiary-dark w-full justify-start items-start">
              {/* Get Started */}
              <Link
                href="/backtest/setup"
                className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-white">
                    <FxrIcon icon="rocket-2-line" size={16} />
                    <span className="text-sm font-medium">Get Started</span>
                  </div>
                </div>
              </Link>

              {/* Testing (Active) */}
              <Link
                href="/dashboard"
                className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark bg-fxr-btn-bg-secondary-active dark:bg-fxr-btn-bg-secondary-active-dark transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="flex place-items-center gap-2 text-gray-900 dark:text-white font-semibold">
                    <i className="pi pi-chart-line text-sm text-[#2C7BFD]" />
                    <span className="text-sm">Testing</span>
                  </div>
                </div>
                <div className="hidden md:group-hover:inline">
                  <span className="py-0.5 px-1.5 text-xs bg-fxr-bg-primary dark:bg-[#030303] text-gray-400 rounded-md border border-[#1b2433]">
                    T
                  </span>
                </div>
              </Link>

              {/* Live */}
              <div className="w-full">
                <a
                  href="#live"
                  className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300">
                      <i className="pi pi-money-bill text-sm" />
                      <span className="text-sm font-medium">Live</span>
                    </div>
                    <span className="!rounded-xl px-1.5 py-0.5 text-[10px] font-semibold bg-gray-200 dark:bg-[#1b2433] text-gray-600 dark:text-gray-300">
                      Beta
                    </span>
                  </div>
                  <div className="hidden md:group-hover:inline">
                    <span className="py-0.5 px-1.5 text-xs bg-fxr-bg-primary dark:bg-[#030303] text-gray-400 rounded-md border border-[#1b2433]">
                      V
                    </span>
                  </div>
                </a>
              </div>

              {/* Strategies */}
              <div className="w-full">
                <a
                  href="#strategies"
                  className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300">
                      <i className="pi pi-compass text-sm" />
                      <span className="text-sm font-medium">Strategies</span>
                    </div>
                    <span className="!bg-[#2C7BFD] !rounded-xl !text-white px-1.5 py-0.5 text-[10px] font-semibold">
                      New
                    </span>
                  </div>
                  <div className="hidden md:group-hover:inline">
                    <span className="py-0.5 px-1.5 text-xs bg-fxr-bg-primary dark:bg-[#030303] text-gray-400 rounded-md border border-[#1b2433]">
                      S
                    </span>
                  </div>
                </a>
              </div>

              {/* Battles */}
              <div className="w-full">
                <a
                  href="#battles"
                  className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark neon-effect transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FxrIcon icon="sword-line" size={16} />
                      <span className="text-sm font-medium">Battles</span>
                    </div>
                    <span className="!rounded-xl px-1.5 py-0.5 text-[10px] font-semibold bg-gray-200 dark:bg-[#1b2433] text-gray-600 dark:text-gray-300">
                      Beta
                    </span>
                  </div>
                  <div className="hidden md:group-hover:inline">
                    <span className="py-0.5 px-1.5 text-xs bg-fxr-bg-primary dark:bg-[#030303] text-gray-400 rounded-md border border-[#1b2433]">
                      B
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Items */}
          <div className="flex flex-col gap-2 py-2 w-full">
            {/* Education */}
            <a
              href="#education"
              className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300">
                  <i className="pi pi-graduation-cap text-sm" />
                  <span className="text-sm font-medium">Education</span>
                </div>
                <span className="!rounded-xl px-1.5 py-0.5 text-[10px] font-semibold bg-gray-200 dark:bg-[#1b2433] text-gray-600 dark:text-gray-300">
                  New
                </span>
              </div>
            </a>

            {/* Account Settings */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full h-10 py-2.5 px-3.5 gap-0 justify-between items-center flex cursor-pointer rounded-xl group hover:dark:text-white hover:bg-fxr-btn-bg-secondary-hover hover:dark:bg-fxr-btn-bg-secondary-hover-dark transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <div className="flex place-items-center gap-2 text-gray-700 dark:text-gray-300">
                  <i className="pi pi-cog text-sm" />
                  <span className="text-sm font-medium">Account Settings</span>
                </div>
              </div>
            </button>

            {/* Version Footer */}
            <div className="pt-2 pl-3">
              <span className="text-fxr-text-secondary text-xs opacity-70">
                Version: 2.0.3734-prod
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
