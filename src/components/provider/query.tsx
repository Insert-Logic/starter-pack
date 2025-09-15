'use client';

import type { ReactNode } from 'react';
import { QueryProvider, client } from '@insertlogic/o8-lib';
import { QueryClientProvider } from '@tanstack/react-query';

export const AppQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </QueryProvider>
  );
};

export { client as queryClient };
