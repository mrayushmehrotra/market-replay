'use client';

import React, { useRef, useEffect, useState } from 'react';

export type TabType = 'dashboard' | 'sessions' | 'trades' | 'analytics';

interface DashboardTabsProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'pi-th-large' },
  { id: 'sessions', label: 'Sessions', icon: 'pi-list' },
  { id: 'trades', label: 'Trades', icon: 'pi-book' },
  { id: 'analytics', label: 'Analytics', icon: 'pi-chart-bar' },
];

export function DashboardTabs({ activeTab, onChangeTab }: DashboardTabsProps) {
  const [inkbarStyle, setInkbarStyle] = useState<{ width: number; left: number }>({
    width: 126,
    left: 32,
  });
  const tabRefs = useRef<{ [key in TabType]?: HTMLButtonElement | null }>({});

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setInkbarStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className="top-0 sticky z-40 bg-gradient-to-r from-white dark:from-fxr-bg-primary-dark border-b border-gray-200 dark:border-fxr-border-tertiary-dark">
      <div className="overflow-x-auto no-scrollbar px-4 sm:px-8">
        <div role="tablist" className="relative flex items-center gap-1 sm:gap-2 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => onChangeTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                className={`flex items-center gap-2 text-sm font-bold py-3.5 px-4 cursor-pointer transition-colors relative z-10 ${
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-fxr-text-secondary-dark dark:hover:text-gray-200'
                }`}
              >
                <i className={`pi ${tab.icon} text-sm`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* Animated Active Inkbar */}
          <span
            role="presentation"
            className="p-tablist-active-bar absolute bottom-0 h-[2px] bg-[#2C7BFD] rounded-full transition-all duration-300 ease-out z-20"
            style={{
              width: `${inkbarStyle.width}px`,
              left: `${inkbarStyle.left}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
