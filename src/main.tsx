import { StrictMode } from 'react';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ModeProvider, UserProvider, type Mode } from '@insertlogic/o8-lib';
import { AppQueryProvider, queryClient } from './components/provider/query';
import { QueryClient } from '@tanstack/react-query';
import { getTheme } from './util';

const router = createRouter({ routeTree, context: { queryClient: queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    context: {
      queryClient: QueryClient;
    };
  }
}

(async () => {
  const mode: Mode = await getTheme();

  const rootElement = document.getElementById('root')!;
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <AppQueryProvider>
          <UserProvider>
            <ModeProvider defaultMode={mode}>
              <RouterProvider router={router} />
            </ModeProvider>
          </UserProvider>
        </AppQueryProvider>
      </StrictMode>,
    );
  }
})();
