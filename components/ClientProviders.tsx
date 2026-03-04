'use client';

import { SessionProvider } from 'next-auth/react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { SiteContentProvider } from '@/contexts/SiteContentContext';

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  if (isStaticExport) {
    return (
      <SiteContentProvider>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </SiteContentProvider>
    );
  }

  return (
    <SessionProvider>
      <SiteContentProvider>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </SiteContentProvider>
    </SessionProvider>
  );
}

