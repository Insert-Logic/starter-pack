import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { MainNav, Toaster } from '@insertlogic/o8-lib';
import { Footer } from '@insertlogic/o8-lib';

export type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <main className="flex h-full w-full flex-col">
        <div className="bg-card shrink-0 px-10">
          <MainNav />
        </div>
        <div className="min-h-0 w-full flex-1 grow overflow-hidden">
          <Outlet />
        </div>
        <div className="bg-card shrink-0 px-10">
          <Footer />
        </div>
      </main>
      {/* <TanStackRouterDevtools /> */}
      <Toaster />
    </>
  ),
});
