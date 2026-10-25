'use client';

import React, { useState } from 'react';
import {
  IconCrosshair,
  IconTrendLine,
  IconHorizontalLine,
  IconHorizontalRay,
  IconFibRetracement,
  IconPitchfork,
  IconBrush,
  IconRectangle,
  IconRotatedRectangle,
  IconCircle,
  IconText,
  IconCallout,
  IconPatterns,
  IconLongShortPosition,
  IconSmiley,
  IconMeasure,
  IconZoomIn,
  IconMagnet,
  IconStayInMode,
  IconLockAll,
  IconEyeHide,
  IconTrash,
} from './icons';
import { DrawingTool } from './types';

interface LeftToolbarProps {
  activeTool: DrawingTool;
  onSelectTool: (tool: DrawingTool) => void;
  isMagnetActive: boolean;
  onToggleMagnet: () => void;
  isLocked: boolean;
  onToggleLock: () => void;
  isHidden: boolean;
  onToggleHide: () => void;
  onClearAll: () => void;
  isClassicTheme?: boolean;
}

export function LeftToolbar({
  activeTool,
  onSelectTool,
  isMagnetActive,
  onToggleMagnet,
  isLocked,
  onToggleLock,
  isHidden,
  onToggleHide,
  onClearAll,
  isClassicTheme = true,
}: LeftToolbarProps) {
  const [openFlyout, setOpenFlyout] = useState<string | null>(null);

  // Group definitions
  const toolGroups = [
    {
      id: 'cursor',
      current: 'cursor_cross',
      icon: <IconCrosshair className="w-4 h-4" />,
      title: 'Cursors',
      subtools: [
        { id: 'cursor_cross' as DrawingTool, label: 'Crosshair', icon: <IconCrosshair className="w-4 h-4" /> },
        { id: 'cursor_dot' as DrawingTool, label: 'Dot', icon: <span className="w-2 h-2 rounded-full bg-current inline-block" /> },
        { id: 'cursor_arrow' as DrawingTool, label: 'Arrow', icon: <span className="font-bold text-xs">↗</span> },
        { id: 'cursor_eraser' as DrawingTool, label: 'Eraser', icon: <IconTrash className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'lines',
      current: 'trend_line',
      icon: <IconTrendLine className="w-4 h-4" />,
      title: 'Trend Line Tools',
      subtools: [
        { id: 'trend_line' as DrawingTool, label: 'Trend Line', icon: <IconTrendLine className="w-4 h-4" /> },
        { id: 'horizontal_ray' as DrawingTool, label: 'Horizontal Ray', icon: <IconHorizontalRay className="w-4 h-4" /> },
        { id: 'horizontal_line' as DrawingTool, label: 'Horizontal Line', icon: <IconHorizontalLine className="w-4 h-4" /> },
      ],
    },
    {
      id: 'fib',
      current: 'fib_retracement',
      icon: <IconFibRetracement className="w-4 h-4" />,
      title: 'Gann and Fibonacci Tools',
      subtools: [
        { id: 'fib_retracement' as DrawingTool, label: 'Fib Retracement', icon: <IconFibRetracement className="w-4 h-4" /> },
        { id: 'fib_extension' as DrawingTool, label: 'Trend-Based Fib Extension', icon: <IconFibRetracement className="w-4 h-4" /> },
        { id: 'pitchfork' as DrawingTool, label: 'Pitchfork', icon: <IconPitchfork className="w-4 h-4" /> },
      ],
    },
    {
      id: 'shapes',
      current: 'rectangle',
      icon: <IconRectangle className="w-4 h-4" />,
      title: 'Geometric Shapes',
      subtools: [
        { id: 'brush' as DrawingTool, label: 'Brush', icon: <IconBrush className="w-4 h-4" /> },
        { id: 'rectangle' as DrawingTool, label: 'Rectangle', icon: <IconRectangle className="w-4 h-4" /> },
        { id: 'rotated_rectangle' as DrawingTool, label: 'Rotated Rectangle', icon: <IconRotatedRectangle className="w-4 h-4" /> },
        { id: 'circle' as DrawingTool, label: 'Circle', icon: <IconCircle className="w-4 h-4" /> },
      ],
    },
    {
      id: 'annotations',
      current: 'text',
      icon: <IconText className="w-4 h-4" />,
      title: 'Annotation Tools',
      subtools: [
        { id: 'text' as DrawingTool, label: 'Text', icon: <IconText className="w-4 h-4" /> },
        { id: 'callout' as DrawingTool, label: 'Callout', icon: <IconCallout className="w-4 h-4" /> },
      ],
    },
    {
      id: 'patterns',
      current: 'head_and_shoulders',
      icon: <IconPatterns className="w-4 h-4" />,
      title: 'Patterns',
      subtools: [
        { id: 'head_and_shoulders' as DrawingTool, label: 'Head and Shoulders', icon: <IconPatterns className="w-4 h-4" /> },
        { id: 'xabcd' as DrawingTool, label: 'XABCD Pattern', icon: <IconPatterns className="w-4 h-4" /> },
      ],
    },
    {
      id: 'prediction',
      current: 'long_position',
      icon: <IconLongShortPosition className="w-4 h-4" />,
      title: 'Prediction and Measurement',
      subtools: [
        { id: 'long_position' as DrawingTool, label: 'Long Position', icon: <IconLongShortPosition className="w-4 h-4" /> },
        { id: 'short_position' as DrawingTool, label: 'Short Position', icon: <IconLongShortPosition className="w-4 h-4" /> },
      ],
    },
    {
      id: 'icons',
      current: 'icon_sticker',
      icon: <IconSmiley className="w-4 h-4" />,
      title: 'Icons & Stickers',
      subtools: [
        { id: 'icon_sticker' as DrawingTool, label: 'Icons', icon: <IconSmiley className="w-4 h-4" /> },
      ],
    },
  ];

  const themeClasses = isClassicTheme
    ? {
        bar: 'bg-[#e0e3eb] border-[#d1d4dc] text-[#131722]',
        btnHover: 'hover:bg-[#cdd1dc] hover:text-[#000]',
        btnActive: 'bg-white text-[#2962ff] shadow-sm',
        divider: 'bg-[#cbd0db]',
        flyout: 'bg-[#ffffff] border-[#c5c8cf] text-[#131722] shadow-lg',
        flyoutItemHover: 'hover:bg-[#f0f3fa]',
      }
    : {
        bar: 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]',
        btnHover: 'hover:bg-[#2a2e39] hover:text-white',
        btnActive: 'bg-[#2962ff]/20 text-[#2962ff]',
        divider: 'bg-[#2a2e39]',
        flyout: 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] shadow-xl',
        flyoutItemHover: 'hover:bg-[#2a2e39] hover:text-white',
      };

  return (
    <aside
      className={`w-12 flex-shrink-0 flex flex-col items-center py-1.5 border-r select-none z-20 ${themeClasses.bar}`}
    >
      {/* Top Drawing Tools */}
      <div className="flex flex-col gap-1 items-center w-full px-1">
        {toolGroups.map((group) => {
          const isGroupActive = group.subtools.some((s) => s.id === activeTool);
          const activeSubtool = group.subtools.find((s) => s.id === activeTool) || group.subtools[0];

          return (
            <div key={group.id} className="relative w-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  onSelectTool(activeSubtool.id);
                  setOpenFlyout(null);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setOpenFlyout(openFlyout === group.id ? null : group.id);
                }}
                title={group.title}
                className={`relative w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer group ${
                  isGroupActive ? themeClasses.btnActive : themeClasses.btnHover
                }`}
              >
                {activeSubtool.icon}
                {/* Micro chevron indicating flyout menu */}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenFlyout(openFlyout === group.id ? null : group.id);
                  }}
                  className="absolute bottom-0.5 right-0.5 text-[8px] opacity-40 hover:opacity-100"
                >
                  ▶
                </span>
              </button>

              {/* Flyout Submenu */}
              {openFlyout === group.id && (
                <div
                  className={`absolute left-10 top-0 ml-1 rounded-md border py-1 w-44 z-50 text-xs ${themeClasses.flyout}`}
                >
                  {group.subtools.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        onSelectTool(sub.id);
                        setOpenFlyout(null);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors cursor-pointer ${
                        activeTool === sub.id ? 'text-[#2962ff] font-medium' : ''
                      } ${themeClasses.flyoutItemHover}`}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className={`w-6 h-px my-1 ${themeClasses.divider}`} />

        {/* Measurement & Utility */}
        <button
          type="button"
          onClick={() => onSelectTool('measure')}
          title="Measure (Shift + Click)"
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
            activeTool === 'measure' ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          <IconMeasure className="w-4 h-4" />
        </button>

        <button
          type="button"
          title="Zoom In"
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${themeClasses.btnHover}`}
        >
          <IconZoomIn className="w-4 h-4" />
        </button>

        <div className={`w-6 h-px my-1 ${themeClasses.divider}`} />

        {/* Magnet Mode */}
        <button
          type="button"
          onClick={onToggleMagnet}
          title="Magnet Mode (Snaps drawings to bars)"
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
            isMagnetActive ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          <IconMagnet className="w-4 h-4" />
        </button>

        {/* Lock All Drawings */}
        <button
          type="button"
          onClick={onToggleLock}
          title="Lock All Drawing Tools"
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
            isLocked ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          <IconLockAll className="w-4 h-4" />
        </button>

        {/* Hide All Drawings */}
        <button
          type="button"
          onClick={onToggleHide}
          title="Hide All Drawings"
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
            isHidden ? themeClasses.btnActive : themeClasses.btnHover
          }`}
        >
          <IconEyeHide className="w-4 h-4" />
        </button>

        {/* Remove All */}
        <button
          type="button"
          onClick={onClearAll}
          title="Remove Objects (Trash)"
          className={`w-8 h-8 rounded flex items-center justify-center hover:text-red-500 transition-colors cursor-pointer ${themeClasses.btnHover}`}
        >
          <IconTrash className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
