import { NextResponse } from 'next/server';
import type { Candle } from '@/types';

const TIMEFRAME_TO_INTERVAL: Record<string, string> = {
  '1M': '1min',
  '5M': '5min',
  '15M': '15min',
  '1H': '1h',
  '4H': '4h',
  '1D': '1day',
};

type TwelveDataValue = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume?: string;
};

type TwelveDataResponse = {
  status?: string;
  message?: string;
  values?: TwelveDataValue[];
  meta?: {
    symbol?: string;
  };
};

function normalizeSymbol(symbol: string) {
  const cleaned = symbol.trim().toUpperCase().replace(/\s+/g, '');

  if (cleaned.includes('/')) return cleaned;
  if (cleaned.includes('-')) return cleaned.replace('-', '/');
  if (/^[A-Z]{6}$/.test(cleaned)) return `${cleaned.slice(0, 3)}/${cleaned.slice(3)}`;

  return cleaned;
}

function parseUtcTimestamp(datetime: string) {
  const match = datetime.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/
  );

  if (!match) {
    return Math.floor(new Date(datetime).getTime() / 1000);
  }

  const [, year, month, day, hour = '0', minute = '0', second = '0'] = match;

  return Math.floor(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    ) / 1000
  );
}

export async function GET(request: Request) {
  const apiKey = process.env.TWELVEDATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TWELVEDATA_API_KEY is not configured. Add it to your .env file.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol')?.trim();
  const timeframe = searchParams.get('timeframe')?.trim() || '1H';

  if (!symbol) {
    return NextResponse.json({ error: 'A symbol is required.' }, { status: 400 });
  }

  const interval = TIMEFRAME_TO_INTERVAL[timeframe];

  if (!interval) {
    return NextResponse.json(
      { error: `Unsupported timeframe: ${timeframe}` },
      { status: 400 }
    );
  }

  const requestedSize = Number(searchParams.get('outputsize') || 5000);
  const outputsize = Number.isFinite(requestedSize)
    ? Math.min(Math.max(Math.floor(requestedSize), 1), 5000)
    : 5000;

  const url = new URL('https://api.twelvedata.com/time_series');
  url.searchParams.set('symbol', normalizeSymbol(symbol));
  url.searchParams.set('interval', interval);
  url.searchParams.set('outputsize', String(outputsize));
  url.searchParams.set('order', 'ASC');
  url.searchParams.set('timezone', 'UTC');
  url.searchParams.set('apikey', apiKey);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
    });
    const data = (await response.json()) as TwelveDataResponse;

    if (!response.ok || data.status === 'error' || !Array.isArray(data.values)) {
      return NextResponse.json(
        { error: data.message || 'Failed to load data from TwelveData.' },
        { status: response.ok ? 502 : response.status }
      );
    }

    const candles: Candle[] = data.values
      .map((value) => ({
        time: parseUtcTimestamp(value.datetime),
        open: Number(value.open),
        high: Number(value.high),
        low: Number(value.low),
        close: Number(value.close),
        volume: value.volume === undefined ? undefined : Number(value.volume),
      }))
      .filter(
        (candle) =>
          Number.isFinite(candle.time) &&
          Number.isFinite(candle.open) &&
          Number.isFinite(candle.high) &&
          Number.isFinite(candle.low) &&
          Number.isFinite(candle.close)
      );

    if (candles.length === 0) {
      return NextResponse.json(
        { error: 'TwelveData returned no candles for that symbol and timeframe.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      symbol: data.meta?.symbol || normalizeSymbol(symbol),
      interval,
      candles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Unable to reach TwelveData: ${error.message}`
            : 'Unable to reach TwelveData.',
      },
      { status: 502 }
    );
  }
}
