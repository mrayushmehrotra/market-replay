'use client';

import React, { useState } from 'react';

interface TimeInvestedChartProps {
  timeInvestedSeconds?: number;
}

export function TimeInvestedChart({ timeInvestedSeconds = 3420 }: TimeInvestedChartProps) {
  const [hovered, setHovered] = useState(false);

  const hours = timeInvestedSeconds / 3600;
  const minutes = Math.floor((timeInvestedSeconds % 3600) / 60);
  const formattedHours = hours.toFixed(2);

  // Dynamic max hours for scale (at least 1 hour, or round up to nearest half hour)
  const maxHours = Math.max(1.0, Math.ceil(hours * 2) / 2);
  const chartHeight = 190;
  const barHeight = Math.min(chartHeight, Math.max(10, (hours / maxHours) * chartHeight));
  const barY = 216 - barHeight;

  return (
    <div className="relative w-full h-[290px] overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 600 280"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb100" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffc133" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="crosshairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(216,227,240,0.4)" />
            <stop offset="100%" stopColor="rgba(190,209,230,0.1)" />
          </linearGradient>
        </defs>

        {/* Y Axis Labels */}
        <g className="text-xs" fill="#8a9099" textAnchor="end" style={{ fontFamily: 'Lato, sans-serif' }}>
          <text x="60" y="30">{maxHours} hrs</text>
          <text x="60" y="68">{(maxHours * 0.8).toFixed(1)} hrs</text>
          <text x="60" y="106">{(maxHours * 0.6).toFixed(1)} hrs</text>
          <text x="60" y="144">{(maxHours * 0.4).toFixed(1)} hrs</text>
          <text x="60" y="182">{(maxHours * 0.2).toFixed(1)} hrs</text>
          <text x="60" y="220">0 hrs</text>
        </g>

        {/* Grid lines */}
        <g stroke="#3a4252" strokeDasharray="6 6" strokeWidth="0.8">
          <line x1="75" y1="26" x2="570" y2="26" opacity="0.5" />
          <line x1="75" y1="64" x2="570" y2="64" opacity="0.5" />
          <line x1="75" y1="102" x2="570" y2="102" opacity="0.5" />
          <line x1="75" y1="140" x2="570" y2="140" opacity="0.5" />
          <line x1="75" y1="178" x2="570" y2="178" opacity="0.5" />
          <line x1="75" y1="216" x2="570" y2="216" opacity="0.8" />
        </g>

        {/* Hover column background */}
        {hovered && (
          <rect
            x="240"
            y="26"
            width="160"
            height="190"
            fill="url(#crosshairGrad)"
            opacity="0.8"
          />
        )}

        {/* Dynamic Bar */}
        <rect
          x="260"
          y={barY}
          width="120"
          height={barHeight}
          rx="6"
          ry="6"
          fill="url(#amberGrad)"
          stroke="#ffb100"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        {/* X Axis Label */}
        <text
          x="320"
          y="245"
          fill="#8a9099"
          textAnchor="middle"
          fontSize="12"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Oct 2026
        </text>
      </svg>

      {/* Floating Tooltip */}
      {hovered && (
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#121824] border border-[#1b2433] text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none flex items-center gap-2 z-20"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffb100]" />
          <span className="text-gray-400">Oct 2026:</span>
          <span className="font-bold text-white">
            {formattedHours} hrs ({Math.floor(hours * 60)} min)
          </span>
        </div>
      )}
    </div>
  );
}

interface WinRateChartProps {
  winRate?: number;
}

export function WinRateChart({ winRate = 41.03 }: WinRateChartProps) {
  const [hovered, setHovered] = useState(false);

  const pct = Math.min(100, Math.max(0, winRate));
  const chartHeight = 190;
  const barHeight = Math.max(6, (pct / 100) * chartHeight);
  const barY = 216 - barHeight;

  return (
    <div className="relative w-full h-[290px] overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 350 280"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0260fd" stopOpacity="1" />
            <stop offset="100%" stopColor="#3580fd" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="crosshairBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(216,227,240,0.3)" />
            <stop offset="100%" stopColor="rgba(190,209,230,0.05)" />
          </linearGradient>
        </defs>

        {/* Y Axis Labels */}
        <g className="text-xs" fill="#8a9099" textAnchor="end" style={{ fontFamily: 'Lato, sans-serif' }}>
          <text x="45" y="30">100%</text>
          <text x="45" y="68">80%</text>
          <text x="45" y="106">60%</text>
          <text x="45" y="144">40%</text>
          <text x="45" y="182">20%</text>
          <text x="45" y="220">0%</text>
        </g>

        {/* Grid lines */}
        <g stroke="#3a4252" strokeDasharray="6 6" strokeWidth="0.8">
          <line x1="55" y1="26" x2="330" y2="26" opacity="0.5" />
          <line x1="55" y1="64" x2="330" y2="64" opacity="0.5" />
          <line x1="55" y1="102" x2="330" y2="102" opacity="0.5" />
          <line x1="55" y1="140" x2="330" y2="140" opacity="0.5" />
          <line x1="55" y1="178" x2="330" y2="178" opacity="0.5" />
          <line x1="55" y1="216" x2="330" y2="216" opacity="0.8" />
        </g>

        {/* Hover Crosshair */}
        {hovered && (
          <rect
            x="130"
            y="26"
            width="120"
            height="190"
            fill="url(#crosshairBlue)"
            opacity="0.8"
          />
        )}

        {/* Dynamic Bar */}
        <rect
          x="150"
          y={barY}
          width="80"
          height={barHeight}
          rx="6"
          ry="6"
          fill="url(#blueGrad)"
          stroke="#0260fd"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        {/* X Axis Label */}
        <text
          x="190"
          y="245"
          fill="#8a9099"
          textAnchor="middle"
          fontSize="12"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          Oct 2026
        </text>
      </svg>

      {/* Floating Tooltip */}
      {hovered && (
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#121824] border border-[#1b2433] text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none flex items-center gap-2 z-20"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#0260fd]" />
          <span className="text-gray-400">Win Rate:</span>
          <span className="font-bold text-white">{pct.toFixed(2)}%</span>
        </div>
      )}
    </div>
  );
}

interface TradesBySymbolChartProps {
  tradesCount?: number;
  symbol?: string;
}

export function TradesBySymbolChart({ tradesCount = 39, symbol = 'XAUUSD' }: TradesBySymbolChartProps) {
  const [hovered, setHovered] = useState(false);

  const maxTrades = Math.max(50, Math.ceil(tradesCount / 10) * 10);
  const chartWidth = 240;
  const barWidth = Math.max(10, (tradesCount / maxTrades) * chartWidth);

  return (
    <div className="relative w-full h-[290px] overflow-hidden select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 350 280"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a502fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c533e0" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <g stroke="#3a4252" strokeDasharray="6 6" strokeWidth="0.8">
          <line x1="85" y1="30" x2="85" y2="220" opacity="0.6" />
          <line x1="145" y1="30" x2="145" y2="220" opacity="0.4" />
          <line x1="205" y1="30" x2="205" y2="220" opacity="0.4" />
          <line x1="265" y1="30" x2="265" y2="220" opacity="0.4" />
          <line x1="325" y1="30" x2="325" y2="220" opacity="0.6" />
        </g>

        {/* Y Axis Label */}
        <text
          x="75"
          y="125"
          fill="#8a9099"
          textAnchor="end"
          fontSize="12"
          fontWeight="500"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          {symbol}
        </text>

        {/* Dynamic Horizontal Bar */}
        <rect
          x="85"
          y="75"
          width={barWidth}
          height="80"
          rx="6"
          ry="6"
          fill="url(#purpleGrad)"
          stroke="#a502fd"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />

        {/* X Axis Labels */}
        <g fill="#8a9099" fontSize="12" style={{ fontFamily: 'Lato, sans-serif' }}>
          <text x="85" y="245" textAnchor="middle">0</text>
          <text x="205" y="245" textAnchor="middle">{Math.round(maxTrades / 2)}</text>
          <text x="325" y="245" textAnchor="middle">{maxTrades}</text>
        </g>
      </svg>

      {/* Floating Tooltip */}
      {hovered && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#121824] border border-[#1b2433] text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none flex items-center gap-2 z-20"
          style={{ fontFamily: 'Lato, sans-serif' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#c533e0]" />
          <span className="text-gray-400">{symbol}:</span>
          <span className="font-bold text-white">{tradesCount} Trades</span>
        </div>
      )}
    </div>
  );
}
