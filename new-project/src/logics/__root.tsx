import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { MainNav } from 'components/main-nav';
import Footer from 'components/footer';

export type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
   <main className="bg-background z-0 flex h-full w-full shrink-0 grow basis-0 flex-col items-center justify-between self-stretch">
        <div key={'navbar'} className="bg-card items-center justify-between self-stretch px-6">
          <MainNav />
        </div>
        <div className="flex h-auto w-full grow flex-col self-stretch overflow-y-auto">
          <Outlet />
        </div>
        <div className="bg-card items-center justify-end self-stretch px-6">
          <Footer />
        </div>
      </main>
  ),
});