'use client';

import React, { useState } from 'react';

interface QuickOrderPanelProps {
  currentPrice: number;
  spread?: number;
  onExecuteTrade: (side: 'buy' | 'sell', quantity: number, price: number) => void;
  isClassicTheme?: boolean;
}

export function QuickOrderPanel({
  currentPrice,
  spread = 126.0,
  onExecuteTrade,
  isClassicTheme = true,
}: QuickOrderPanelProps) {
  const [quantity, setQuantity] = useState(8);

  const halfSpread = (spread / 100) * 0.5;
  const sellPrice = currentPrice - halfSpread;
  const buyPrice = currentPrice + halfSpread;

  // Format with large base digits and small subscript/superscript
  const formatQuote = (p: number) => {
    const fixed = p >= 100 ? p.toFixed(2) : p.toFixed(5);
    const main = fixed.slice(0, -1);
    const last = fixed.slice(-1);
    return { main, last };
  };

  const sellFmt = formatQuote(sellPrice);
  const buyFmt = formatQuote(buyPrice);

  return (
    <div className="absolute top-12 left-3 z-20 flex items-stretch select-none text-xs rounded shadow-md overflow-hidden border border-black/20">
      {/* Red Sell Button */}
      <button
        type="button"
        onClick={() => onExecuteTrade('sell', quantity, sellPrice)}
        className="flex flex-col items-center justify-center px-3 py-1.5 bg-[#f23645] hover:bg-[#d82a38] active:bg-[#b81d2a] text-white transition-colors cursor-pointer min-w-[76px]"
      >
        <span className="font-mono font-bold leading-none text-sm">
          {sellFmt.main}
          <sup className="text-[10px] font-normal">{sellFmt.last}</sup>
        </span>
        <span className="text-[10px] font-semibold opacity-90 tracking-wide mt-0.5">SELL</span>
      </button>

      {/* Middle Spread & Qty Column */}
      <div
        className={`flex flex-col items-center justify-between px-2 py-1 text-[10px] font-mono font-medium border-x ${
          isClassicTheme
            ? 'bg-[#e0e3eb] text-[#2a2e39] border-[#cbd0db]'
            : 'bg-[#1e222d] text-[#b2b5be] border-[#2a2e39]'
        }`}
      >
        <span>{spread.toFixed(1)}</span>

        {/* Quantity Stepper */}
        <div className="flex items-center gap-1 my-0.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-[9px] hover:text-blue-500 font-bold px-0.5"
          >
            ▼
          </button>
          <span className="font-bold text-xs px-1 text-center min-w-[14px]">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="text-[9px] hover:text-blue-500 font-bold px-0.5"
          >
            ▲
          </button>
        </div>
      </div>

      {/* Blue Buy Button */}
      <button
        type="button"
        onClick={() => onExecuteTrade('buy', quantity, buyPrice)}
        className="flex flex-col items-center justify-center px-3 py-1.5 bg-[#2962ff] hover:bg-[#1e53e5] active:bg-[#1542c2] text-white transition-colors cursor-pointer min-w-[76px]"
      >
        <span className="font-mono font-bold leading-none text-sm">
          {buyFmt.main}
          <sup className="text-[10px] font-normal">{buyFmt.last}</sup>
        </span>
        <span className="text-[10px] font-semibold opacity-90 tracking-wide mt-0.5">BUY</span>
      </button>
    </div>
  );
}
