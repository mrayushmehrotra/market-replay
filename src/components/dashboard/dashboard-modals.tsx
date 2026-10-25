'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionData } from '@/types/dashboard';
import { FxrIcon } from './fxr-icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#090d14] border border-[#1b2433] rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-1 cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <FxrIcon icon="flashlight-line" size={18} color="#2C7BFD" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-lato text-white">Upgrade to Market Replay Pro</h3>
            <span className="text-xs text-[#80AFFE]">Unlock limitless backtesting potential</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          On the Beginner plan, sessions are archived after 7 days. Upgrade to Pro for unlimited lifetime sessions, multi-timeframe charts, and full prop firm simulation.
        </p>

        <div className="space-y-2.5 mb-6 text-xs text-gray-200">
          {[
            'Unlimited lifetime session storage',
            'All Forex pairs, Indices, Commodities & Crypto',
            'Full Prop Firm rules & challenge evaluator',
            'Tick-by-tick simulation & custom timeframes',
            'AI Mentor strategy analysis',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-[#121824] border border-[#1e2738] mb-6 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold font-lato text-white">$29</span>
            <span className="text-xs text-gray-400"> / month</span>
          </div>
          <span className="text-[11px] font-semibold text-[#80AFFE] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            Cancel anytime
          </span>
        </div>

        <button
          onClick={() => {
            alert('Redirecting to secure subscription checkout...');
            onClose();
          }}
          className="w-full py-3 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
        >
          Get Pro Access Now
        </button>
      </div>
    </div>
  );
}

export function HelpModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#090d14] border border-[#1b2433] rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-1 cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <i className="pi pi-question-circle text-2xl text-[#2C7BFD]" />
          <div>
            <h3 className="text-lg font-bold font-lato text-white">Help Center & Shortcuts</h3>
            <span className="text-xs text-gray-400">Quick guides and keyboard shortcuts</span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <h4 className="font-semibold text-gray-200 mb-1.5">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2 text-gray-400">
              <div className="flex justify-between p-2 rounded-lg bg-[#121824] border border-[#1e2738]">
                <span>Testing Dashboard</span>
                <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-white">T</kbd>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121824] border border-[#1e2738]">
                <span>Live Mode</span>
                <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-white">V</kbd>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121824] border border-[#1e2738]">
                <span>Strategies</span>
                <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-white">S</kbd>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121824] border border-[#1e2738]">
                <span>Battles</span>
                <kbd className="px-1.5 py-0.5 bg-black rounded text-[10px] text-white">B</kbd>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-1.5">Replay Engine Controls</h4>
            <div className="p-3 rounded-xl bg-[#121824] border border-[#1e2738] space-y-1 text-gray-400">
              <p>• <b>Spacebar</b>: Play / Pause candle replay</p>
              <p>• <b>Right Arrow</b>: Step forward 1 candle</p>
              <p>• <b>Left Arrow</b>: Step backward 1 candle</p>
              <p>• <b>B / S</b>: Quick Market Buy / Market Sell</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function SummaryModal({
  isOpen,
  session,
  onClose,
}: {
  isOpen: boolean;
  session: SessionData | null;
  onClose: () => void;
}) {
  const router = useRouter();
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#090d14] border border-[#1b2433] rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-1 cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#2C7BFD]/15 flex items-center justify-center">
            <FxrIcon icon="bar-chart-fill" size={18} color="#2C7BFD" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-lato text-white">{session.name}</h3>
            <span className="text-xs text-gray-400">{session.symbol} · {session.dateRange}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Net Profit</span>
            <span className="text-base font-bold text-[#22c55e]">{session.netPnl}</span>
          </div>
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Win Rate</span>
            <span className="text-base font-bold text-white">{session.winRate}</span>
          </div>
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Profit Factor</span>
            <span className="text-base font-bold text-white">{session.profitFactor}</span>
          </div>
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Max Drawdown</span>
            <span className="text-base font-bold text-[#ef4444]">{session.maxDrawdown}</span>
          </div>
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Total Trades</span>
            <span className="text-base font-bold text-white">{session.tradesCount}</span>
          </div>
          <div className="p-3 bg-[#121824] border border-[#1e2738] rounded-xl flex flex-col gap-1">
            <span className="text-gray-400">Current Balance</span>
            <span className="text-base font-bold text-white">{session.balance}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              router.push('/backtest/replay');
            }}
            className="flex-1 py-2.5 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Open in Chart Replay
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#151c28] hover:bg-[#1a2333] text-gray-300 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDrawer({
  isOpen,
  session,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  session: SessionData | null;
  onClose: () => void;
  onSave: (updated: Partial<SessionData>) => void;
}) {
  const [name, setName] = useState(session?.name || '');

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm h-full bg-[#090d14] border-l border-[#1b2433] p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-lato text-white">Session Settings</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">✕</button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Session Name</label>
              <input
                type="text"
                defaultValue={session.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#121824] border border-[#1e2738] text-white outline-none focus:border-[#2C7BFD]"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Symbol</label>
              <input
                type="text"
                disabled
                value={session.symbol}
                className="w-full p-2.5 rounded-xl bg-[#0f141f] border border-[#1e2738] text-gray-400 outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Starting Account Capital</label>
              <input
                type="text"
                defaultValue={session.balance}
                className="w-full p-2.5 rounded-xl bg-[#121824] border border-[#1e2738] text-white outline-none focus:border-[#2C7BFD]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (name) onSave({ name });
              onClose();
            }}
            className="flex-1 py-2.5 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-semibold rounded-xl text-xs cursor-pointer"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#151c28] hover:bg-[#1a2333] text-gray-300 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
