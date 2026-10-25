'use client';

import React, { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  balanceAtom,
  candlesAtom,
  closeTradeAtom,
  currentIndexAtom,
  equityAtom,
  openTradeAtom,
  tradesAtom,
} from '@/stores/replay-store';
import { recordTradeMetric } from '@/lib/services/dashboard-service';

export function TradePanel() {
  const trades = useAtomValue(tradesAtom);
  const currentIndex = useAtomValue(currentIndexAtom);
  const candles = useAtomValue(candlesAtom);
  const equity = useAtomValue(equityAtom);
  const balance = useAtomValue(balanceAtom);
  const openTrade = useSetAtom(openTradeAtom);
  const closeTrade = useSetAtom(closeTradeAtom);
  const [quantity, setQuantity] = useState('1.0');
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

  const currentPrice = currentIndex >= 0 && candles[currentIndex] ? candles[currentIndex].close : 0;
  const openTrades = trades.filter((t) => t.status === 'open');
  const closedTrades = trades.filter((t) => t.status === 'closed');

  const handleOpenLong = () => {
    if (currentPrice <= 0) return;
    openTrade({
      side: 'long',
      entryPrice: currentPrice,
      quantity: parseFloat(quantity) || 1.0,
      stopLoss: sl ? parseFloat(sl) : undefined,
      takeProfit: tp ? parseFloat(tp) : undefined,
    });
    recordTradeMetric('default_user', 'long');
  };

  const handleOpenShort = () => {
    if (currentPrice <= 0) return;
    openTrade({
      side: 'short',
      entryPrice: currentPrice,
      quantity: parseFloat(quantity) || 1.0,
      stopLoss: sl ? parseFloat(sl) : undefined,
      takeProfit: tp ? parseFloat(tp) : undefined,
    });
    recordTradeMetric('default_user', 'short');
  };

  return (
    <div className="h-full flex flex-col p-4 bg-[#090d14] text-white text-xs select-none">
      {/* Account Metric Badges */}
      <div className="mb-4 pb-3 border-b border-[#1b2433] space-y-1 font-lato">
        <div className="flex justify-between items-center text-gray-400">
          <span>Market Price</span>
          <span className="text-white font-mono font-bold text-sm">
            {currentPrice > 0 ? currentPrice.toFixed(2) : '---'}
          </span>
        </div>
        <div className="flex justify-between items-center text-gray-400">
          <span>Balance</span>
          <span className="text-gray-200 font-semibold">${balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-gray-400">
          <span>Equity</span>
          <span className="text-white font-bold">${equity.toLocaleString()}</span>
        </div>
      </div>

      {/* Order Entry Form */}
      <div className="space-y-3 mb-4">
        {/* Lot Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-400 font-medium">Position Size (Lots)</label>
            <div className="flex gap-1 text-[10px]">
              {['0.1', '0.5', '1.0', '2.0'].map((lot) => (
                <button
                  key={lot}
                  type="button"
                  onClick={() => setQuantity(lot)}
                  className="px-1.5 py-0.5 rounded bg-[#121824] hover:bg-[#1b2433] text-gray-300 cursor-pointer"
                >
                  {lot}
                </button>
              ))}
            </div>
          </div>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-[#2C7BFD]"
          />
        </div>

        {/* SL and TP */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-gray-400 block mb-1">Stop Loss</label>
            <input
              type="number"
              step="0.1"
              placeholder="Price"
              value={sl}
              onChange={(e) => setSl(e.target.value)}
              className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-2.5 py-2 text-white font-mono outline-none focus:border-[#2C7BFD]"
            />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Take Profit</label>
            <input
              type="number"
              step="0.1"
              placeholder="Price"
              value={tp}
              onChange={(e) => setTp(e.target.value)}
              className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-2.5 py-2 text-white font-mono outline-none focus:border-[#2C7BFD]"
            />
          </div>
        </div>

        {/* Execution Buttons: Buy & Sell */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleOpenLong}
            disabled={currentIndex < 0}
            className="w-full py-2.5 rounded-xl font-bold bg-[#22c55e] hover:bg-[#1ea34d] disabled:opacity-40 text-black transition-all cursor-pointer shadow-md shadow-green-500/20 active:scale-95"
          >
            BUY / LONG
          </button>
          <button
            type="button"
            onClick={handleOpenShort}
            disabled={currentIndex < 0}
            className="w-full py-2.5 rounded-xl font-bold bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-40 text-white transition-all cursor-pointer shadow-md shadow-red-500/20 active:scale-95"
          >
            SELL / SHORT
          </button>
        </div>
      </div>

      {/* Tabs: Open Trades vs Closed Trades */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex border-b border-[#1b2433] mb-2">
          <button
            onClick={() => setActiveTab('open')}
            className={`flex-1 py-1.5 text-center font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'open'
                ? 'border-[#2C7BFD] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Open ({openTrades.length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex-1 py-1.5 text-center font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'closed'
                ? 'border-[#2C7BFD] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Closed ({closedTrades.length})
          </button>
        </div>

        {/* Trade items */}
        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
          {activeTab === 'open' && (
            <>
              {openTrades.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No open positions</div>
              ) : (
                openTrades.map((trade) => {
                  const tradePnl =
                    trade.side === 'long'
                      ? (currentPrice - trade.entryPrice) * trade.quantity * 100
                      : (trade.entryPrice - currentPrice) * trade.quantity * 100;

                  return (
                    <div
                      key={trade.id}
                      className="p-2.5 rounded-xl bg-[#121824] border border-[#1e2738] space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                            trade.side === 'long'
                              ? 'bg-green-500/20 text-[#22c55e]'
                              : 'bg-red-500/20 text-[#ef4444]'
                          }`}
                        >
                          {trade.side.toUpperCase()} {trade.quantity} lots
                        </span>
                        <button
                          onClick={() => {
                            closeTrade({ tradeId: trade.id, exitPrice: currentPrice });
                            if (tradePnl > 0) {
                              recordTradeMetric('default_user', trade.side, true);
                            }
                          }}
                          className="px-2 py-0.5 rounded bg-gray-700 hover:bg-gray-600 text-white text-[10px] cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[11px]">
                        <span>Entry: {trade.entryPrice.toFixed(2)}</span>
                        <span
                          className={`font-bold ${
                            tradePnl >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
                          }`}
                        >
                          {tradePnl >= 0 ? '+' : ''}${tradePnl.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'closed' && (
            <>
              {closedTrades.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No closed trades yet</div>
              ) : (
                closedTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className="p-2.5 rounded-xl bg-[#121824] border border-[#1e2738] space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-bold text-[10px] ${
                          trade.side === 'long' ? 'text-[#22c55e]' : 'text-[#ef4444]'
                        }`}
                      >
                        {trade.side.toUpperCase()}
                      </span>
                      <span
                        className={`font-bold ${
                          (trade.pnl || 0) >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
                        }`}
                      >
                        {(trade.pnl || 0) >= 0 ? '+' : ''}${trade.pnl?.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Entry: {trade.entryPrice.toFixed(2)} | Exit: {trade.exitPrice?.toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
