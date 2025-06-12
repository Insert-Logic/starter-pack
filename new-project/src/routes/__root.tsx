import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';

export type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <main className="bg-background z-0 flex h-full w-full shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <div className="flex h-auto w-full grow flex-col self-stretch overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});