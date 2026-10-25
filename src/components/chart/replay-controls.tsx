'use client';

import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  candlesAtom,
  currentIndexAtom,
  isPlayingAtom,
  jumpToAtom,
  pauseAtom,
  playAtom,
  setSpeedAtom,
  speedAtom,
  stepBackwardAtom,
  stepForwardAtom,
} from '@/stores/replay-store';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export function ReplayControls() {
  const isPlaying = useAtomValue(isPlayingAtom);
  const speed = useAtomValue(speedAtom);
  const currentIndex = useAtomValue(currentIndexAtom);
  const candles = useAtomValue(candlesAtom);
  const play = useSetAtom(playAtom);
  const pause = useSetAtom(pauseAtom);
  const stepForward = useSetAtom(stepForwardAtom);
  const stepBackward = useSetAtom(stepBackwardAtom);
  const setSpeed = useSetAtom(setSpeedAtom);
  const jumpTo = useSetAtom(jumpToAtom);

  const speeds = [
    { ms: 1000, label: '1x' },
    { ms: 500, label: '2x' },
    { ms: 250, label: '5x' },
    { ms: 100, label: '10x' },
  ];

  const totalCandles = candles.length;
  const currentPos = currentIndex >= 0 ? currentIndex + 1 : 0;

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#090d14] border-t border-[#1b2433]">
      {/* Top Row: Playback Controls & Speed */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={stepBackward}
            disabled={currentIndex <= 0}
            title="Step backward (Left Arrow)"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#121824] hover:bg-[#1b2433] disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 hover:text-white transition-colors cursor-pointer border border-[#1e2738]"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={isPlaying ? pause : play}
            disabled={currentIndex >= totalCandles - 1}
            title="Play / Pause (Spacebar)"
            className="w-10 h-8 rounded-lg flex items-center justify-center bg-[#2C7BFD] hover:bg-[#2576fd] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={stepForward}
            disabled={currentIndex >= totalCandles - 1}
            title="Step forward (Right Arrow)"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#121824] hover:bg-[#1b2433] disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 hover:text-white transition-colors cursor-pointer border border-[#1e2738]"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[#1b2433] mx-1" />

          {/* Speed Selector */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-gray-400 mr-1 hidden sm:inline">Speed:</span>
            {speeds.map((s) => (
              <button
                key={s.ms}
                onClick={() => setSpeed(s.ms)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  speed === s.ms
                    ? 'bg-[#2C7BFD] text-white'
                    : 'bg-[#121824] text-gray-400 hover:text-gray-200 hover:bg-[#1b2433] border border-[#1e2738]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs text-gray-400 font-mono">
          {totalCandles > 0 ? (
            <span>
              Candle: <span className="text-white font-bold">{currentPos}</span> / {totalCandles}
            </span>
          ) : (
            'No candles loaded'
          )}
        </div>
      </div>

      {/* Bottom Row: Scrubber Timeline */}
      {totalCandles > 0 && (
        <div className="w-full flex items-center gap-3 pt-1">
          <input
            type="range"
            min={0}
            max={totalCandles - 1}
            value={Math.max(0, currentIndex)}
            onChange={(e) => jumpTo(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#121824] rounded-lg appearance-none cursor-pointer accent-[#2C7BFD]"
          />
        </div>
      )}
    </div>
  );
}
