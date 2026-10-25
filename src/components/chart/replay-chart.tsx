'use client';

import { useEffect, useRef } from 'react';
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts';
import { useAtomValue } from 'jotai';
import { candlesAtom, currentIndexAtom } from '@/stores/replay-store';

export function ReplayChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  
  const candles = useAtomValue(candlesAtom);
  const currentIndex = useAtomValue(currentIndexAtom);
  
  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#030303' },
        textColor: '#8a9099',
      },
      grid: {
        vertLines: { color: '#131926' },
        horzLines: { color: '#131926' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#1b2433',
      },
      rightPriceScale: {
        borderColor: '#1b2433',
      },
      crosshair: {
        vertLine: { color: '#2C7BFD', width: 1, style: 2 },
        horzLine: { color: '#2C7BFD', width: 1, style: 2 },
      },
    });
    
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });
    
    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);
  
  useEffect(() => {
    if (!candlestickSeriesRef.current) return;
    
    // Show candles up to currentIndex
    const visibleCandles = currentIndex >= 0 ? candles.slice(0, currentIndex + 1) : [];
    const data: CandlestickData<UTCTimestamp>[] = visibleCandles.map(c => ({
      time: c.time as UTCTimestamp,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));
    
    candlestickSeriesRef.current.setData(data);
  }, [candles, currentIndex]);
  
  return <div ref={chartContainerRef} className="w-full h-full" />;
}
