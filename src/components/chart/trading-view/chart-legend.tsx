'use client';

import React from 'react';

interface ChartLegendProps {
  symbolTitle: string;
  timeframe: string;
  exchange: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  prevClose?: number | null;
  isClassicTheme?: boolean;
}

export function ChartLegend({
  symbolTitle = 'Gold Spot / U.S. Dollar',
  timeframe = '1',
  exchange = 'OANDA',
  open,
  high,
  low,
  close,
  volume,
  prevClose,
  isClassicTheme = true,
}: ChartLegendProps) {
  const o = open ?? 3999.795;
  const h = high ?? 4000.62;
  const l = low ?? 3999.105;
  const c = close ?? 4000.515;
  const v = volume ?? 505;

  const refPrice = prevClose ?? o;
  const change = c - refPrice;
  const changePercent = refPrice !== 0 ? (change / refPrice) * 100 : 0;
  const isUp = change >= 0;

  const textColor = isClassicTheme ? 'text-[#131722]' : 'text-[#d1d4dc]';
  const labelColor = isClassicTheme ? 'text-[#787b86]' : 'text-[#868993]';
  const changeColor = isUp ? 'text-[#089981]' : 'text-[#f23645]';

  const fmt = (val: number) => {
    return val >= 100 ? val.toFixed(3) : val.toFixed(5);
  };

  return (
    <div className="absolute top-2 left-3 z-10 select-none pointer-events-auto flex flex-col gap-0.5 text-xs">
      {/* Top Line: Symbol, Timeframe, Exchange, Actions, OHLC */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={`font-bold tracking-tight ${textColor}`}>
          {symbolTitle} · {timeframe} · {exchange}
        </span>

        {/* Live Market Dot */}
        <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />

        {/* Mini icons */}
        <div className="flex items-center gap-1 opacity-60 hover:opacity-100">
          <button type="button" className="hover:text-blue-500 cursor-pointer text-[10px]">
            👁
          </button>
          <button type="button" className="hover:text-blue-500 cursor-pointer text-[10px]">
            ⚙
          </button>
          <button type="button" className="hover:text-blue-500 cursor-pointer text-[10px]">
            ···
          </button>
        </div>

        {/* Dynamic OHLC readout */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] ml-1">
          <span className={labelColor}>O</span>
          <span className={textColor}>{fmt(o)}</span>

          <span className={labelColor}>H</span>
          <span className={textColor}>{fmt(h)}</span>

          <span className={labelColor}>L</span>
          <span className={textColor}>{fmt(l)}</span>

          <span className={labelColor}>C</span>
          <span className={textColor}>{fmt(c)}</span>

          <span className={`font-semibold ${changeColor}`}>
            {change >= 0 ? '+' : ''}
            {change.toFixed(3)} ({change >= 0 ? '+' : ''}
            {changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Second Line: Volume */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono">
        <span className={labelColor}>Vol</span>
        <span className={isUp ? 'text-[#089981]' : 'text-[#f23645]'}>{Math.round(v)}</span>
        <span className={`text-[10px] ${changeColor}`}>
          {change >= 0 ? '+' : ''}
          {(change * 20).toFixed(3)} ({changePercent.toFixed(2)}%)
        </span>

        <div className="flex items-center gap-1 opacity-50 hover:opacity-100 ml-1">
          <button type="button" className="hover:text-blue-500 cursor-pointer text-[9px]">
            👁
          </button>
          <button type="button" className="hover:text-blue-500 cursor-pointer text-[9px]">
            ⚙
          </button>
          <button type="button" className="hover:text-red-500 cursor-pointer text-[9px]">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
