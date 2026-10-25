'use client';

import { Provider } from 'jotai';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/components/auth/auth-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
