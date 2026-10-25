export type ChartTheme = 'classic' | 'dark';

export type Timeframe = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '4h' | 'D' | 'W';

export type ChartType = 'candles' | 'bars' | 'hollow_candles' | 'heikin_ashi' | 'line' | 'area' | 'baseline';

export type DrawingTool =
  | 'cursor_cross'
  | 'cursor_dot'
  | 'cursor_arrow'
  | 'cursor_eraser'
  | 'trend_line'
  | 'ray'
  | 'info_line'
  | 'horizontal_line'
  | 'horizontal_ray'
  | 'vertical_line'
  | 'cross_line'
  | 'fib_retracement'
  | 'fib_extension'
  | 'pitchfork'
  | 'brush'
  | 'highlighter'
  | 'rectangle'
  | 'rotated_rectangle'
  | 'circle'
  | 'path'
  | 'text'
  | 'callout'
  | 'price_label'
  | 'head_and_shoulders'
  | 'xabcd'
  | 'long_position'
  | 'short_position'
  | 'date_range'
  | 'price_range'
  | 'icon_sticker'
  | 'measure';

export type RightDockTab =
  | 'watchlist'
  | 'alerts'
  | 'news'
  | 'data_window'
  | 'hotlists'
  | 'calendar'
  | 'my_ideas'
  | 'public_chats'
  | 'private_chats'
  | 'idea_stream'
  | 'streams'
  | 'notifications'
  | 'order_panel'
  | 'dom'
  | 'object_tree'
  | 'help'
  | null;

export type BottomPanelTab = 'pine_editor' | 'strategy_tester' | 'trading_panel' | null;

export interface SymbolItem {
  symbol: string;
  name: string;
  exchange: string;
  category: 'Forex' | 'Metals' | 'Crypto' | 'Indices' | 'Stocks';
  price: number;
  change: number;
  changePercent: number;
  digits: number;
}

export interface IndicatorConfig {
  id: string;
  name: string;
  shortName: string;
  enabled: boolean;
  color: string;
  params?: Record<string, number | string>;
}

export interface DrawingObject {
  id: string;
  tool: DrawingTool;
  points: { x: number; y: number; time?: number; price?: number }[];
  color?: string;
  text?: string;
  extra?: Record<string, any>;
}
