'use client';

import { useEffect, useRef, useState } from 'react';
import { incrementChartTime, recordTradeMetric } from '@/lib/services/dashboard-service';
import { useAuth } from '@/components/auth/auth-provider';

export function useChartTimeTracker() {
  const auth = useAuth();
  const userId = auth.user?.uid || 'default_user';

  const [activeSecondsInSession, setActiveSecondsInSession] = useState(0);
  const pendingSecondsRef = useRef(0);

  // Sync pending seconds to database & Firebase
  const flushTime = useRef(() => {
    if (pendingSecondsRef.current > 0) {
      const sec = pendingSecondsRef.current;
      pendingSecondsRef.current = 0;
      incrementChartTime(userId, sec).catch(() => {});
    }
  });

  useEffect(() => {
    // 1-second interval tracking
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) {
        return; // Don't track if tab is hidden
      }
      setActiveSecondsInSession((prev) => prev + 1);
      pendingSecondsRef.current += 1;

      // Flush every 5 seconds
      if (pendingSecondsRef.current >= 5) {
        flushTime.current();
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        flushTime.current();
      }
    };

    const handleBeforeUnload = () => {
      flushTime.current();
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      clearInterval(interval);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
      flushTime.current();
    };
  }, [userId]);

  return {
    activeSecondsInSession,
    recordTrade: (side: 'long' | 'short', isWin?: boolean) => {
      recordTradeMetric(userId, side, isWin);
    },
  };
}
