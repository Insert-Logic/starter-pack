import { StrictMode } from 'react';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ModeProvider from 'components/provider/mode';
import UserProvider from 'components/provider/user';
import QueryProvider, { client } from 'components/provider/query';
import type { Mode } from 'context/index';
import { QueryClient } from '@tanstack/react-query';
const router = createRouter({ routeTree, context: { queryClient: client } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    context: {
      queryClient: QueryClient;
    };
  }
}

const mode: Mode = 'light'; // Set default mode
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryProvider>
        <UserProvider>
          <ModeProvider defaultMode={mode}>
            <RouterProvider router={router} />
          </ModeProvider>
        </UserProvider>
      </QueryProvider>
    </StrictMode>,
  );
}