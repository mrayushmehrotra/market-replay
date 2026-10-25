'use client';

import React, { useState } from 'react';
import { FxrIcon } from './fxr-icon';

interface DashboardNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenUpgrade: () => void;
  onOpenHelp: () => void;
}

export function DashboardNavbar({
  sidebarOpen,
  onToggleSidebar,
  onOpenUpgrade,
  onOpenHelp,
}: DashboardNavbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="!transition-none duration-300 ease-in-out w-full top-0 border-b border-b-gray-200 dark:border-fxr-border-tertiary-dark z-30">
      <nav className="dark:bg-fxr-bg-primary-dark dark:border-fxr-border-tertiary-dark w-full max-h-20 px-4 sm:px-6 bg-white justify-between items-center inline-flex relative !transition-none duration-300 overflow-visible">
        {/* Left Section: Sidebar Toggle & Brand Logo */}
        <div className="justify-start items-center gap-4 sm:gap-6 flex h-20 py-2">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="flex w-8 h-8 justify-center items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-gray-500 dark:text-fxr-text-secondary-dark"
          >
            <FxrIcon
              icon={sidebarOpen ? 'menu-fold-line' : 'menu-line'}
              size={20}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>

          <a href="/dashboard" className="w-auto flex justify-center items-center">
            {/* Desktop Full Logo */}
            <img
              src="/assets/logos/market-replay-white.svg"
              alt="Market Replay"
              className="hidden dark:sm:flex w-40 h-6 !transition-none duration-100 ease-in-out opacity-100"
            />
            <img
              src="/assets/logos/market-replay-black.svg"
              alt="Market Replay"
              className="hidden dark:sm:hidden sm:flex w-40 h-6 !transition-none duration-100 ease-in-out opacity-100"
            />
            {/* Mobile Arrow Logo */}
            <img
              src="/assets/logos/market-replay-arrow-white.svg"
              alt="Market Replay"
              className="hidden dark:flex dark:sm:hidden w-8 h-6 !transition-none duration-100 ease-in-out opacity-100"
            />
            <img
              src="/assets/logos/market-replay-arrow-black.svg"
              alt="Market Replay"
              className="dark:hidden flex sm:hidden w-8 h-6 !transition-none duration-100 ease-in-out opacity-100"
            />
          </a>
        </div>

        {/* Right Section: Pro Badge, Lang, Theme, Help, Fullscreen */}
        <div className="justify-end items-center gap-2 sm:gap-4 flex">
          {/* Tier Badge */}
          <button
            type="button"
            onClick={onOpenUpgrade}
            aria-label="Available on Pro Plan"
            className="p-tag flex items-center justify-center gap-1 rounded-[6px] border-2 border-white dark:border-[#030303] text-[#80AFFE] backdrop-blur-[12px] !text-[10px] font-inter !py-0.5 !px-2 bg-[rgba(44,123,253,0.25)] cursor-pointer hover:bg-[rgba(44,123,253,0.35)] transition-all shadow-sm"
          >
            <FxrIcon icon="flashlight-line" size={10} color="#80AFFE" />
            <span className="font-semibold tracking-wide">Pro</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full xl:!w-auto fxr-button fxr-button-tertiary cursor-pointer"
            >
              <div className="box-content w-full whitespace-nowrap rounded-full justify-center items-center inline-flex text-center font-normal font-sans leading-normal gap-1 text-xs sm:text-sm text-fxr-text-primary dark:text-fxr-text-primary-dark !bg-transparent hover:bg-black/5 dark:hover:bg-white/5 h-7 px-2.5 py-1 rounded-lg transition-colors">
                <span>{currentLang}</span>
                <FxrIcon icon="arrow-down-s-line" size={16} className="text-gray-400" />
              </div>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-[#0d121c] border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-xl shadow-2xl py-1 z-50 text-sm">
                {['EN', 'ES', 'FR', 'DE', 'JA'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-medium cursor-pointer ${
                      currentLang === lang ? 'text-[#2C7BFD] font-bold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            data-test="theme"
            aria-label="theme switcher"
            className="flex w-8 h-8 justify-center items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-gray-500 dark:text-fxr-text-secondary-dark"
          >
            <FxrIcon
              icon={isDark ? 'sun-fill' : 'moon-fill'}
              size={18}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>

          {/* Help Center */}
          <button
            onClick={onOpenHelp}
            aria-label="Help Center"
            title="Help Center"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-gray-500 dark:text-fxr-text-secondary-dark"
          >
            <i className="pi pi-question-circle text-base text-gray-700 dark:text-gray-300" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            title="Toggle Fullscreen"
            className="hidden sm:flex w-8 h-8 justify-center items-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-gray-500 dark:text-fxr-text-secondary-dark"
          >
            <FxrIcon
              icon={isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'}
              size={18}
              className="text-gray-700 dark:text-gray-300"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
