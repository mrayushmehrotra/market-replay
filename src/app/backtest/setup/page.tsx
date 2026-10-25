'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { setAccountAtom, setSymbolAtom, setTimeframeAtom } from '@/stores/replay-store';
import { getDefaultRules } from '@/lib/replay/engine';

export default function SetupPage() {
  const router = useRouter();
  const setAccount = useSetAtom(setAccountAtom);
  const setStoredSymbol = useSetAtom(setSymbolAtom);
  const setStoredTimeframe = useSetAtom(setTimeframeAtom);

  const [accountSize, setAccountSize] = useState('50000');
  const [challengeType, setChallengeType] = useState('ftmo');
  const [symbol, setSymbol] = useState('XAUUSD');
  const [timeframe, setTimeframe] = useState('1H');

  const handleContinue = () => {
    const rules = getDefaultRules(challengeType);
    setStoredSymbol(symbol);
    setStoredTimeframe(timeframe);
    setAccount({ balance: parseInt(accountSize), rules });
    router.push('/backtest/load-data');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 sm:p-12 flex flex-col justify-start items-center relative select-none">
      {/* Top Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <i className="pi pi-arrow-left text-xs" />
          <span>Back to Testing Dashboard</span>
        </Link>
        <span className="text-xs text-[#80AFFE] font-mono">Step 1 of 2</span>
      </div>

      <div className="w-full max-w-2xl bg-[#090d14] border border-[#1b2433] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-lato text-white mb-2">
            Configure Backtesting Session
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Set up your simulation account capital, prop firm challenge rules, and primary instrument.
          </p>
        </div>

        {/* Account Size */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300">Account Size</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['10000', '25000', '50000', '100000'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setAccountSize(size)}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                  accountSize === size
                    ? 'border-[#2C7BFD] bg-[#2C7BFD]/15 text-[#80AFFE]'
                    : 'border-[#1e2738] bg-[#121824] text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                ${parseInt(size).toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Provider */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300">Evaluation / Challenge Rules</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'ftmo', name: 'FTMO Standard' },
              { id: 'topstep', name: 'TopStep' },
              { id: 'fundednext', name: 'FundedNext' },
              { id: 'the5ers', name: 'The5ers' },
              { id: 'myforexfunds', name: 'MyForexFunds' },
              { id: 'custom', name: 'Custom Rules' },
            ].map((firm) => (
              <button
                key={firm.id}
                type="button"
                onClick={() => setChallengeType(firm.id)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                  challengeType === firm.id
                    ? 'border-[#2C7BFD] bg-[#2C7BFD]/15 text-[#80AFFE]'
                    : 'border-[#1e2738] bg-[#121824] text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {firm.name}
              </button>
            ))}
          </div>
        </div>

        {/* Symbol and Timeframe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Trading Instrument</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g. XAUUSD, EURUSD, BTCUSD"
              className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-[#2C7BFD]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Default Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#2C7BFD] cursor-pointer"
            >
              <option value="1M">1 Minute</option>
              <option value="5M">5 Minutes</option>
              <option value="15M">15 Minutes</option>
              <option value="1H">1 Hour</option>
              <option value="4H">4 Hours</option>
              <option value="1D">1 Day</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-98"
        >
          Continue to Historical Data →
        </button>
      </div>
    </div>
  );
}
