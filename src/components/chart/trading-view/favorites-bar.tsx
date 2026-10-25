'use client';

import React from 'react';
import {
  IconCrosshair,
  IconTrendLine,
  IconHorizontalRay,
  IconFibRetracement,
  IconRectangle,
  IconBrush,
  IconText,
  IconLongShortPosition,
  IconTrash,
} from './icons';
import { DrawingTool } from './types';

interface FavoritesBarProps {
  activeTool: DrawingTool;
  onSelectTool: (tool: DrawingTool) => void;
  onClearDrawings?: () => void;
  isClassicTheme?: boolean;
}

export function FavoritesBar({
  activeTool,
  onSelectTool,
  onClearDrawings,
  isClassicTheme = true,
}: FavoritesBarProps) {
  const tools: { id: DrawingTool; label: string; icon: React.ReactNode }[] = [
    { id: 'cursor_cross', label: 'Crosshair', icon: <IconCrosshair className="w-4 h-4" /> },
    { id: 'trend_line', label: 'Trend Line', icon: <IconTrendLine className="w-4 h-4" /> },
    { id: 'horizontal_ray', label: 'Horizontal Ray', icon: <IconHorizontalRay className="w-4 h-4" /> },
    { id: 'fib_retracement', label: 'Fib Retracement', icon: <IconFibRetracement className="w-4 h-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <IconRectangle className="w-4 h-4" /> },
    { id: 'brush', label: 'Brush', icon: <IconBrush className="w-4 h-4" /> },
    { id: 'text', label: 'Text', icon: <IconText className="w-4 h-4" /> },
    { id: 'long_position', label: 'Long/Short Position', icon: <IconLongShortPosition className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded shadow-sm border text-xs select-none backdrop-blur-sm transition-colors ${
        isClassicTheme
          ? 'bg-[#c5c8cf]/90 border-[#a9adb6] text-[#2a2e39]'
          : 'bg-[#1e222d]/90 border-[#2a2e39] text-[#d1d4dc]'
      }`}
    >
      <div className="cursor-grab text-gray-400 px-1 py-0.5 hover:text-gray-600">
        <svg className="w-3 h-3.5" viewBox="0 0 6 12" fill="currentColor">
          <circle cx="1.5" cy="2" r="1" />
          <circle cx="4.5" cy="2" r="1" />
          <circle cx="1.5" cy="6" r="1" />
          <circle cx="4.5" cy="6" r="1" />
          <circle cx="1.5" cy="10" r="1" />
          <circle cx="4.5" cy="10" r="1" />
        </svg>
      </div>

      {tools.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelectTool(t.id)}
          title={t.label}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            activeTool === t.id
              ? isClassicTheme
                ? 'bg-white shadow text-[#2962ff]'
                : 'bg-[#2962ff]/20 text-[#2962ff]'
              : isClassicTheme
              ? 'hover:bg-[#b0b4bd] text-[#131722]'
              : 'hover:bg-[#2a2e39] text-[#b2b5be] hover:text-white'
          }`}
        >
          {t.icon}
        </button>
      ))}

      <div
        className={`h-4 w-px mx-1 ${isClassicTheme ? 'bg-[#a9adb6]' : 'bg-[#2a2e39]'}`}
      />

      <button
        type="button"
        onClick={onClearDrawings}
        title="Remove Drawings"
        className={`p-1.5 rounded hover:text-red-500 transition-colors cursor-pointer ${
          isClassicTheme ? 'hover:bg-[#b0b4bd] text-[#5d606b]' : 'hover:bg-[#2a2e39] text-[#868993]'
        }`}
      >
        <IconTrash className="w-4 h-4" />
      </button>
    </div>
  );
}
