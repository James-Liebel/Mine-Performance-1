'use client';

import { useSession } from 'next-auth/react';

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

type SafeSession = {
  data: ReturnType<typeof useSession>['data'];
  status: ReturnType<typeof useSession>['status'];
};

export function useSafeSession(): SafeSession {
  const value = useSession();

  if (isStaticExport) {
    return { data: null, status: 'unauthenticated' };
  }

  if (!value) {
    return { data: null, status: 'unauthenticated' };
  }

  return { data: value.data, status: value.status };
}

