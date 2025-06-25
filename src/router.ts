import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { client } from 'components/provider/query';

export const router = createRouter({ routeTree,context: {queryClient: client} });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}