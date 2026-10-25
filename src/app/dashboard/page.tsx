'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardTabs, TabType } from '@/components/dashboard/dashboard-tabs';
import { DashboardUpgradeBanner } from '@/components/dashboard/dashboard-upgrade-banner';
import { ActionButtons } from '@/components/dashboard/action-buttons';
import { AnalyticsOverview } from '@/components/dashboard/analytics-overview';
import { SessionsBrowser, SessionData } from '@/components/dashboard/sessions-browser';
import { MentorFab } from '@/components/dashboard/mentor-fab';
import {
  UpgradeModal,
  HelpModal,
  SummaryModal,
  SettingsDrawer,
} from '@/components/dashboard/dashboard-modals';

import { useDashboardData } from '@/lib/hooks/use-dashboard-data';

export default function DashboardPage() {
  const router = useRouter();
  const { data, setSelectedTab, updateSessions } = useDashboardData();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeTab = (data.selectedTab?.toLowerCase() as TabType) || 'dashboard';

  const handleTabChange = (tab: TabType) => {
    const formatted = tab.charAt(0).toUpperCase() + tab.slice(1);
    setSelectedTab(formatted);
  };

  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedSessionForSummary, setSelectedSessionForSummary] = useState<SessionData | null>(null);
  const [selectedSessionForSettings, setSelectedSessionForSettings] = useState<SessionData | null>(null);

  return (
    <div className="relative w-full h-dvh overflow-hidden flex flex-col bg-fxr-bg-primary-light dark:bg-fxr-bg-primary-dark dark:text-white select-none">
      {/* Background Graphic */}
      <div className="h-dvh w-full fixed inset-0 z-0 bg-fxr-bg-primary dark:bg-fxr-bg-primary-dark pointer-events-none">
        <img
          src="/assets/static-bg-desktop.png"
          alt=""
          className="w-full h-full object-cover opacity-60 dark:opacity-80"
        />
      </div>

      {/* Main Container Shell */}
      <div className="w-full h-dvh z-10 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <DashboardNavbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenUpgrade={() => setUpgradeOpen(true)}
          onOpenHelp={() => setHelpOpen(true)}
        />

        {/* Content Section: Sidebar + Main Router */}
        <section className="flex h-[calc(100dvh-5rem)] w-full divide-x divide-gray-200 dark:divide-fxr-border-tertiary-dark overflow-hidden">
          {/* Left Sidebar */}
          <DashboardSidebar
            isOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
            onOpenSettings={() => setHelpOpen(true)}
          />

          {/* Right Router Container */}
          <div className="dark:text-fxr-text-primary-dark text-fxr-text-primary h-full relative w-full min-w-0 flex-1 flex flex-col overflow-y-auto no-scrollbar">
            {/* Header: Testing Title & Day Streak Badge */}
            <DashboardHeader />

            {/* Sticky Navigation Tabs */}
            <DashboardTabs activeTab={activeTab} onChangeTab={handleTabChange} />

            {/* Tab Views */}
            {activeTab === 'dashboard' && (
              <div className="min-h-full flex flex-col max-w-full">
                {/* Upgrade Alert Banner */}
                <DashboardUpgradeBanner onUpgradeClick={() => setUpgradeOpen(true)} />

                {/* Dashboard Widgets Container */}
                <div className="grow bg-fxr-bg-primary dark:bg-fxr-bg-primary-dark p-4 sm:p-6 w-full items-center flex flex-col justify-start gap-6 pb-24">
                  <div className="w-full xl:!max-w-7xl flex flex-col gap-6">
                    {/* Action Buttons Feature */}
                    <ActionButtons
                      onStartBacktest={() => router.push('/backtest/setup')}
                      onStartPropFirm={() => router.push('/backtest/setup')}
                      onOpenTutorials={() => setHelpOpen(true)}
                    />

                    {/* Analytics Overview Widget */}
                    <AnalyticsOverview />

                    {/* Recent Sessions Browser Widget */}
                    <SessionsBrowser
                      onOpenSummary={(session) => setSelectedSessionForSummary(session)}
                      onOpenSettings={(session) => setSelectedSessionForSettings(session)}
                      onOpenAnalytics={(session) => setSelectedSessionForSummary(session)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Tab View */}
            {activeTab === 'sessions' && (
              <div className="p-6 max-w-7xl w-full mx-auto pb-24">
                <SessionsBrowser
                  onOpenSummary={(session) => setSelectedSessionForSummary(session)}
                  onOpenSettings={(session) => setSelectedSessionForSettings(session)}
                  onOpenAnalytics={(session) => setSelectedSessionForSummary(session)}
                />
              </div>
            )}

            {/* Trades Tab View */}
            {activeTab === 'trades' && (
              <div className="p-6 max-w-7xl w-full mx-auto pb-24 flex flex-col gap-4">
                <h3 className="text-xl font-bold font-lato">Past Trades</h3>
                <div className="border border-gray-200 dark:border-fxr-border-tertiary-dark rounded-2xl p-6 bg-white dark:bg-[#090a0f] shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-[#1b2433] text-gray-400">
                          <th className="py-3 px-4">Date & Time</th>
                          <th className="py-3 px-4">Symbol</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Entry</th>
                          <th className="py-3 px-4">Exit</th>
                          <th className="py-3 px-4">Quantity</th>
                          <th className="py-3 px-4">PnL</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-[#151c28]">
                        {[
                          { date: '10/23/26 14:30', sym: 'XAUUSD', type: 'BUY', entry: '2645.20', exit: '2668.50', qty: '1.0', pnl: '+$2,330.00', win: true },
                          { date: '10/22/26 11:15', sym: 'XAUUSD', type: 'SELL', entry: '2652.80', exit: '2658.10', qty: '1.0', pnl: '-$530.00', win: false },
                          { date: '10/21/26 09:00', sym: 'XAUUSD', type: 'BUY', entry: '2630.00', exit: '2648.40', qty: '1.5', pnl: '+$2,760.00', win: true },
                          { date: '10/19/26 15:45', sym: 'XAUUSD', type: 'SELL', entry: '2660.10', exit: '2649.00', qty: '1.0', pnl: '+$1,110.00', win: true },
                          { date: '10/18/26 13:20', sym: 'XAUUSD', type: 'BUY', entry: '2655.40', exit: '2650.00', qty: '1.0', pnl: '-$540.00', win: false },
                        ].map((t, idx) => (
                          <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5">
                            <td className="py-3 px-4">{t.date}</td>
                            <td className="py-3 px-4 font-bold">{t.sym}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.type === 'BUY' ? 'bg-green-500/20 text-[#22c55e]' : 'bg-red-500/20 text-[#ef4444]'}`}>
                                {t.type}
                              </span>
                            </td>
                            <td className="py-3 px-4">{t.entry}</td>
                            <td className="py-3 px-4">{t.exit}</td>
                            <td className="py-3 px-4">{t.qty}</td>
                            <td className={`py-3 px-4 font-bold ${t.win ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{t.pnl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab View */}
            {activeTab === 'analytics' && (
              <div className="p-6 max-w-7xl w-full mx-auto pb-24 flex flex-col gap-6">
                <AnalyticsOverview />
              </div>
            )}
          </div>
        </section>

        {/* Floating AI Mentor Button & Chat Drawer */}
        <MentorFab />

        {/* Interactive Modals */}
        <UpgradeModal
          isOpen={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
        />
        <HelpModal
          isOpen={helpOpen}
          onClose={() => setHelpOpen(false)}
        />
        <SummaryModal
          isOpen={!!selectedSessionForSummary}
          session={selectedSessionForSummary}
          onClose={() => setSelectedSessionForSummary(null)}
        />
        <SettingsDrawer
          isOpen={!!selectedSessionForSettings}
          session={selectedSessionForSettings}
          onClose={() => setSelectedSessionForSettings(null)}
          onSave={(updated) => {
            if (selectedSessionForSettings) {
              const updatedList = (data.sessions || []).map((s) =>
                s.id === selectedSessionForSettings.id ? { ...s, ...updated } : s
              );
              updateSessions(updatedList);
              setSelectedSessionForSettings(null);
            }
          }}
        />
      </div>
    </div>
  );
}
