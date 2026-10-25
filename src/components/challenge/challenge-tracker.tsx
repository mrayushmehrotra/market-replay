'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import {
  equityAtom,
  failedAtom,
  highWaterMarkAtom,
  initialBalanceAtom,
  passedAtom,
  rulesAtom,
  tradingDaysAtom,
  violationsAtom,
} from '@/stores/replay-store';

export function ChallengeTracker() {
  const equity = useAtomValue(equityAtom);
  const initialBalance = useAtomValue(initialBalanceAtom);
  const highWaterMark = useAtomValue(highWaterMarkAtom);
  const rules = useAtomValue(rulesAtom);
  const violations = useAtomValue(violationsAtom);
  const passed = useAtomValue(passedAtom);
  const failed = useAtomValue(failedAtom);
  const tradingDays = useAtomValue(tradingDaysAtom);

  if (!rules) return null;

  const profitPercent = ((equity - initialBalance) / initialBalance) * 100;
  const overallDD = ((highWaterMark - equity) / Math.max(1, highWaterMark)) * 100;

  return (
    <div className="p-3 bg-[#090d14] text-white text-xs select-none space-y-2.5">
      <div className="flex justify-between items-center pb-1 border-b border-[#1b2433]">
        <span className="font-bold text-gray-200">Challenge Rules</span>
        {passed && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-[#22c55e]">
            PASSED
          </span>
        )}
        {failed && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-[#ef4444]">
            FAILED
          </span>
        )}
      </div>

      {/* Profit Target */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>Profit Target ({rules.profitTarget}%)</span>
          <span className={profitPercent >= rules.profitTarget ? 'text-[#22c55e] font-bold' : 'text-gray-200 font-medium'}>
            {profitPercent.toFixed(2)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#121824] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22c55e] rounded-full transition-all"
            style={{ width: `${Math.min(Math.max(0, (profitPercent / rules.profitTarget) * 100), 100)}%` }}
          />
        </div>
      </div>

      {/* Max Drawdown */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>Max Overall DD ({rules.maxOverallDrawdown}%)</span>
          <span className={overallDD > rules.maxOverallDrawdown * 0.8 ? 'text-[#ef4444] font-bold' : 'text-gray-200 font-medium'}>
            {overallDD.toFixed(2)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#121824] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ef4444] rounded-full transition-all"
            style={{ width: `${Math.min(Math.max(0, (overallDD / rules.maxOverallDrawdown) * 100), 100)}%` }}
          />
        </div>
      </div>

      {/* Trading Days */}
      <div className="flex justify-between text-[11px] text-gray-400 pt-0.5">
        <span>Trading Days</span>
        <span className="text-white font-medium">
          {tradingDays.size} / {rules.minTradingDays} days
        </span>
      </div>

      {/* Rule Violations Alert */}
      {violations.length > 0 && !passed && !failed && (
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-[#ef4444] text-[10px] space-y-0.5">
          {violations.map((v, i) => (
            <div key={i}>⚠ {v}</div>
          ))}
        </div>
      )}
    </div>
  );
}
