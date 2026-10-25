'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  setDataAtom,
  setSymbolAtom,
  setTimeframeAtom,
  symbolAtom,
  timeframeAtom,
} from '@/stores/replay-store';
import Papa from 'papaparse';
import type { Candle } from '@/types';

type CsvRow = Record<string, string | undefined>;
type LoadSource = 'csv' | 'forex' | 'sample' | null;

const TIMEFRAMES = [
  { value: '1M', label: '1 Minute' },
  { value: '5M', label: '5 Minutes' },
  { value: '15M', label: '15 Minutes' },
  { value: '1H', label: '1 Hour' },
  { value: '4H', label: '4 Hours' },
  { value: '1D', label: 'Daily' },
];

function generateSampleCandles(symbol: string): Candle[] {
  const candles: Candle[] = [];
  let price = symbol.includes('XAU') ? 2645.0 : 1.085;
  const now = Math.floor(Date.now() / 1000) - 500 * 3600;

  for (let i = 0; i < 500; i++) {
    const time = now + i * 3600;
    const change = (Math.random() - 0.49) * (symbol.includes('XAU') ? 8.0 : 0.002);
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * (symbol.includes('XAU') ? 3.5 : 0.0008);
    const low = Math.min(open, close) - Math.random() * (symbol.includes('XAU') ? 3.5 : 0.0008);
    price = close;
    candles.push({ time, open, high, low, close, volume: 100 + Math.floor(Math.random() * 500) });
  }
  return candles;
}

export default function LoadDataPage() {
  const router = useRouter();
  const setData = useSetAtom(setDataAtom);
  const symbol = useAtomValue(symbolAtom);
  const timeframe = useAtomValue(timeframeAtom);
  const setSymbol = useSetAtom(setSymbolAtom);
  const setTimeframe = useSetAtom(setTimeframeAtom);
  const [activeTab, setActiveTab] = useState<'sample' | 'csv' | 'forex'>('sample');
  const [loadingSource, setLoadingSource] = useState<LoadSource>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoadSample = () => {
    setLoadingSource('sample');
    const candles = generateSampleCandles(symbol || 'XAUUSD');
    setData(candles);
    setTimeout(() => {
      setLoadingSource(null);
      router.push('/backtest/replay');
    }, 300);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoadingSource('csv');

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const candles: Candle[] = results.data
          .filter((row) => row.time || row.date || row.datetime)
          .map((row) => {
            const datetime = row.time || row.date || row.datetime || '';
            return {
              time: Math.floor(new Date(datetime).getTime() / 1000),
              open: parseFloat(row.open || row.Open || ''),
              high: parseFloat(row.high || row.High || ''),
              low: parseFloat(row.low || row.Low || ''),
              close: parseFloat(row.close || row.Close || ''),
              volume:
                row.volume || row.Volume
                  ? parseFloat(row.volume || row.Volume || '')
                  : undefined,
            };
          })
          .filter(
            (c) =>
              Number.isFinite(c.time) &&
              Number.isFinite(c.open) &&
              Number.isFinite(c.high) &&
              Number.isFinite(c.low) &&
              Number.isFinite(c.close)
          );

        if (candles.length === 0) {
          setError('No valid candles found in that CSV file.');
          setLoadingSource(null);
          return;
        }

        setData(candles);
        setLoadingSource(null);
        router.push('/backtest/replay');
      },
      error: (parseError) => {
        setError(parseError.message);
        setLoadingSource(null);
      },
    });
  };

  const handleForexLoad = async () => {
    setError(null);
    if (!symbol.trim()) {
      setError('Enter a symbol before loading data.');
      return;
    }

    setLoadingSource('forex');

    try {
      const params = new URLSearchParams({
        symbol,
        timeframe,
        outputsize: '5000',
      });
      const response = await fetch(`/api/market-data/twelvedata?${params.toString()}`);
      const payload = await response.json();

      if (!response.ok || !payload.candles?.length) {
        throw new Error(payload.error || 'Failed to load data from TwelveData.');
      }

      setData(payload.candles);
      router.push('/backtest/replay');
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Failed to load data from TwelveData.'
      );
    } finally {
      setLoadingSource(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 sm:p-12 flex flex-col justify-start items-center relative select-none">
      {/* Top Navigation */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <Link
          href="/backtest/setup"
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <i className="pi pi-arrow-left text-xs" />
          <span>Back to Session Setup</span>
        </Link>
        <span className="text-xs text-[#80AFFE] font-mono">Step 2 of 2</span>
      </div>

      <div className="w-full max-w-2xl bg-[#090d14] border border-[#1b2433] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-lato text-white mb-2">
            Load Historical Data
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Choose your data source to populate historical candles for {symbol || 'XAUUSD'}.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[#ef4444] text-xs">
            {error}
          </div>
        )}

        {/* Source Tabs */}
        <div className="flex border-b border-[#1b2433]">
          {[
            { id: 'sample', label: 'Quick Sample Data' },
            { id: 'csv', label: 'Upload CSV' },
            { id: 'forex', label: 'TwelveData API' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'sample' | 'csv' | 'forex')}
              className={`flex-1 py-3 text-center text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#2C7BFD] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Quick Sample Data */}
        {activeTab === 'sample' && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-gray-400 leading-relaxed">
              Instantly generate 500 candles of realistic {symbol || 'XAUUSD'} price action with genuine tick spread and volatility to test strategies immediately without uploading files.
            </p>
            <button
              type="button"
              onClick={handleLoadSample}
              disabled={loadingSource !== null}
              className="w-full py-3.5 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {loadingSource === 'sample' ? 'Preparing candles...' : `Launch Replay with ${symbol || 'XAUUSD'} Data →`}
            </button>
          </div>
        )}

        {/* Tab 2: Upload CSV */}
        {activeTab === 'csv' && (
          <div className="space-y-4 pt-2 text-xs">
            <p className="text-gray-400">
              Upload TradingView, MetaTrader, or custom CSV exports containing Date, Open, High, Low, Close, and Volume.
            </p>
            <div className="p-6 border-2 border-dashed border-[#1e2738] rounded-2xl flex flex-col items-center justify-center gap-3 bg-[#121824]/50">
              <i className="pi pi-upload text-2xl text-gray-400" />
              <label
                htmlFor="csv-upload"
                className="px-4 py-2 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Choose CSV File
              </label>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                disabled={loadingSource !== null}
                className="hidden"
              />
              <span className="text-[11px] text-gray-500">Max size 50MB</span>
            </div>
            {loadingSource === 'csv' && <p className="text-center text-gray-400">Parsing candles...</p>}
          </div>
        )}

        {/* Tab 3: TwelveData API */}
        {activeTab === 'forex' && (
          <div className="space-y-4 pt-2 text-xs">
            <p className="text-gray-400">
              Fetch institutional forex and commodity data from TwelveData API.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 block mb-1">Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. EUR/USD or XAU/USD"
                  className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-3 py-2 text-white outline-none focus:border-[#2C7BFD]"
                />
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-[#121824] border border-[#1e2738] rounded-xl px-3 py-2 text-white outline-none focus:border-[#2C7BFD]"
                >
                  {TIMEFRAMES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleForexLoad}
              disabled={loadingSource !== null}
              className="w-full py-3 bg-[#2C7BFD] hover:bg-[#2576fd] text-white font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {loadingSource === 'forex' ? 'Fetching market data...' : 'Fetch from TwelveData'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
