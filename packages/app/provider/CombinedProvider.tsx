'use client';
import React from 'react';
import { SessionProvider } from '../context/Auth/SessionProvider';
import { ThemeProvider } from '../context/theme';
import { TrpcTanstackProvider } from './TrpcTanstackProvider';
import { NetworkStatusProvider } from './NetworkStatusProvider';
// import dynamic from 'next/dynamic';
import ReduxProvider from './ReduxProvider';

// const ReduxProvider = dynamic(() => import('./ReduxProvider'), {
//   ssr: false,
// });

export function CombinedProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <TrpcTanstackProvider>
        <SessionProvider>
          <ThemeProvider>
            <NetworkStatusProvider>{children}</NetworkStatusProvider>
          </ThemeProvider>
        </SessionProvider>
      </TrpcTanstackProvider>
    </ReduxProvider>
  );
}
