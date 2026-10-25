import React from 'react';

export function TvLogo({ className = 'h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 22H7V6h7v16zM28 22h-7V6h7v16zM21 6H0v4h21V6zM35 6h-4v16h4V6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TvLogoWithText({ className = 'h-6' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 font-bold tracking-tight select-none opacity-40 hover:opacity-80 transition-opacity ${className}`}>
      <svg className="h-4 w-5" viewBox="0 0 36 28" fill="currentColor">
        <path d="M14 22H7V6h7v16zM28 22h-7V6h7v16zM21 6H0v4h21V6zM35 6h-4v16h4V6z" />
      </svg>
      <span className="text-xs font-semibold tracking-normal">TradingView</span>
    </div>
  );
}

// Drawing Toolbar Icons
export function IconCrosshair({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeDasharray="2 2" />
      <line x1="9" y1="1" x2="9" y2="17" />
      <line x1="1" y1="9" x2="17" y2="9" />
    </svg>
  );
}

export function IconTrendLine({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="3.5" cy="14.5" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="3.5" r="1.5" fill="currentColor" />
      <line x1="4.5" y1="13.5" x2="13.5" y2="4.5" />
    </svg>
  );
}

export function IconHorizontalRay({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="4" cy="9" r="1.5" fill="currentColor" />
      <line x1="5.5" y1="9" x2="17" y2="9" />
      <polyline points="14,6 17,9 14,12" />
    </svg>
  );
}

export function IconHorizontalLine({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75">
      <line x1="1" y1="9" x2="17" y2="9" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconFibRetracement({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="2" y1="3" x2="16" y2="3" />
      <line x1="2" y1="7" x2="16" y2="7" />
      <line x1="2" y1="11" x2="16" y2="11" />
      <line x1="2" y1="15" x2="16" y2="15" />
      <line x1="3" y1="15" x2="15" y2="3" strokeDasharray="2 2" strokeWidth="1" />
    </svg>
  );
}

export function IconPitchfork({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="2" y1="16" x2="9" y2="2" />
      <line x1="6" y1="9" x2="16" y2="9" />
      <line x1="9" y1="2" x2="16" y2="2" />
      <line x1="6" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export function IconBrush({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2l2 2-7 7H6v-3l8-6z" fill="currentColor" fillOpacity="0.2" />
      <path d="M6 15c0 1.5-2 1.5-2 1.5s2-3 5-3" strokeLinecap="round" />
    </svg>
  );
}

export function IconRectangle({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="4" width="13" height="10" rx="1" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function IconRotatedRectangle({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="9,2 16,8 9,15 2,9" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function IconCircle({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="6" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function IconText({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 4h10M9 4v10" strokeLinecap="round" />
    </svg>
  );
}

export function IconCallout({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H8l-4 3v-3H3a1 1 0 01-1-1V5a1 1 0 011-1z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function IconPatterns({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="2,14 6,5 10,12 13,3 16,14" />
      <circle cx="2" cy="14" r="1.5" fill="currentColor" />
      <circle cx="6" cy="5" r="1.5" fill="currentColor" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
      <circle cx="13" cy="3" r="1.5" fill="currentColor" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconLongShortPosition({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="12" height="5" fill="#22c55e" fillOpacity="0.4" stroke="#22c55e" />
      <rect x="3" y="8" width="12" height="7" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" />
      <line x1="3" y1="8" x2="15" y2="8" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

export function IconSmiley({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="7" />
      <circle cx="6.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
      <path d="M6 11c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconMeasure({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="14" height="6" rx="1" />
      <line x1="5" y1="6" x2="5" y2="9" />
      <line x1="8" y1="6" x2="8" y2="10" />
      <line x1="11" y1="6" x2="11" y2="9" />
      <line x1="14" y1="6" x2="14" y2="10" />
    </svg>
  );
}

export function IconZoomIn({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="5" />
      <line x1="8" y1="5.5" x2="8" y2="10.5" />
      <line x1="5.5" y1="8" x2="10.5" y2="8" />
      <line x1="12" y1="12" x2="16" y2="16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconMagnet({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 3v5a5 5 0 0010 0V3M4 6h3M11 6h3" />
      <line x1="4" y1="3" x2="7" y2="3" />
      <line x1="11" y1="3" x2="14" y2="3" />
    </svg>
  );
}

export function IconStayInMode({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l4 4-8 8H4v-4l8-8z" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function IconLockAll({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="8" width="10" height="7" rx="1.5" />
      <path d="M6 8V5a3 3 0 016 0v3" />
    </svg>
  );
}

export function IconEyeHide({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
      <circle cx="9" cy="9" r="2.5" />
    </svg>
  );
}

export function IconTrash({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5h12M7 5V3h4v2M5 5v9a1.5 1.5 0 001.5 1.5h5a1.5 1.5 0 001.5-1.5V5" />
      <line x1="7.5" y1="8" x2="7.5" y2="12" />
      <line x1="10.5" y1="8" x2="10.5" y2="12" />
    </svg>
  );
}

// Top Bar Icons
export function IconCandlesticks({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="2" x2="5" y2="16" />
      <rect x="3.5" y="5" width="3" height="7" fill="currentColor" />
      <line x1="13" y1="2" x2="13" y2="16" />
      <rect x="11.5" y="7" width="3" height="6" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function IconCompare({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="7" />
      <line x1="9" y1="5.5" x2="9" y2="12.5" />
      <line x1="5.5" y1="9" x2="12.5" y2="9" />
    </svg>
  );
}

export function IconIndicatorsFx({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <span className="font-serif italic font-bold text-xs tracking-tighter">fx</span>
  );
}

export function IconCloudSave({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12a3 3 0 010-6c.3 0 .7.05 1 .15A5 5 0 0114 8a3 3 0 01-1 6H4z" />
      <polyline points="7,10 9,8 11,10" />
      <line x1="9" y1="8" x2="9" y2="13" />
    </svg>
  );
}

export function IconCamera({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 6.5A1.5 1.5 0 014 5h1.5l1.2-1.6A1 1 0 017.5 3h3a1 1 0 01.8.4L12.5 5H14a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0114 15H4a1.5 1.5 0 01-1.5-1.5v-7z" />
      <circle cx="9" cy="9.5" r="2.5" />
    </svg>
  );
}

// Right Dock Icons
export function IconWatchlist({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="5" x2="15" y2="5" />
      <line x1="3" y1="9" x2="15" y2="9" />
      <line x1="3" y1="13" x2="15" y2="13" />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
      <circle cx="5" cy="9" r="1" fill="currentColor" />
      <circle cx="5" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconAlerts({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9.5" r="6" />
      <polyline points="9,6 9,9.5 12,11.5" />
      <line x1="6" y1="2" x2="12" y2="2" />
    </svg>
  );
}

export function IconNews({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="3.5" width="13" height="11" rx="1" />
      <line x1="5.5" y1="6.5" x2="12.5" y2="6.5" />
      <line x1="5.5" y1="9.5" x2="12.5" y2="9.5" />
      <line x1="5.5" y1="12" x2="9.5" y2="12" />
    </svg>
  );
}

export function IconDataWindow({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="13" height="13" rx="1.5" />
      <line x1="2.5" y1="7" x2="15.5" y2="7" />
      <line x1="8.5" y1="7" x2="8.5" y2="15.5" />
    </svg>
  );
}

export function IconHotlists({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 2.5s3.5 3 3.5 6.5a3.5 3.5 0 01-7 0c0-2 1-3.5 3.5-6.5z" />
      <path d="M9 8.5a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-3 0c0-.8.5-1.2 1.5-1.5z" fill="currentColor" />
    </svg>
  );
}

export function IconCalendar({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="3.5" width="13" height="12" rx="1.5" />
      <line x1="2.5" y1="7" x2="15.5" y2="7" />
      <line x1="6" y1="2" x2="6" y2="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <circle cx="6" cy="10.5" r="1" fill="currentColor" />
      <circle cx="9" cy="10.5" r="1" fill="currentColor" />
      <circle cx="12" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconMyIdeas({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 7.5A3 3 0 0112 7.5c0 1.5-1 2.5-1.5 3.5h-3C7 10 6 9 6 7.5z" />
      <line x1="7.5" y1="13" x2="10.5" y2="13" />
      <line x1="8" y1="15" x2="10" y2="15" />
    </svg>
  );
}

export function IconChats({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 9a4 4 0 00-4-4H4a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5V15l2.5-1.5H8a4 4 0 004-4z" />
      <path d="M14 6h1a3 3 0 013 3c0 1.2-.6 2.2-1.5 2.7V14L14 12.8" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconPrivateChats({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="12" height="9" rx="1.5" />
      <polyline points="4,5 9,9 14,5" />
      <circle cx="13" cy="13" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function IconIdeaStream({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="2" fill="currentColor" />
      <path d="M5.5 5.5a5 5 0 000 7M12.5 5.5a5 5 0 010 7M3 3a8.5 8.5 0 000 12M15 3a8.5 8.5 0 010 12" />
    </svg>
  );
}

export function IconNotifications({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 13h9l-1-2V7.5a3.5 3.5 0 00-7 0V11l-1 2z" />
      <path d="M7.5 14.5a1.5 1.5 0 003 0" />
    </svg>
  );
}

export function IconOrderPanel({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="12" height="12" rx="1.5" />
      <polyline points="6,9 8.5,11.5 12,6.5" />
    </svg>
  );
}

export function IconDom({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="12" height="12" rx="1" />
      <line x1="3" y1="7" x2="15" y2="7" />
      <line x1="3" y1="11" x2="15" y2="11" />
      <line x1="9" y1="3" x2="9" y2="15" strokeDasharray="1 1" />
    </svg>
  );
}

export function IconObjectTree({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="9,2 16,6 9,10 2,6" />
      <polyline points="2,10 9,14 16,10" />
    </svg>
  );
}

export function IconHelp({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="7" />
      <path d="M7 7a2 2 0 013.5 1.2c0 .8-.7 1.3-1.5 1.8v.5" strokeLinecap="round" />
      <circle cx="9" cy="13" r=".75" fill="currentColor" />
    </svg>
  );
}
