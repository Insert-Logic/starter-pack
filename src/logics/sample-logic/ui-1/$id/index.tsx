import { createFileRoute } from '@tanstack/react-router'
import type { SidebarData } from '../../../sample-logic/-context';
import Sidebar from 'components/sidebar';
import { SidebarDetails, SidebarDetailsMobile } from 'components/sidebar-details';
import { stagesSidebar } from '../../../-util';

export const Route = createFileRoute('/sample-logic/ui-1/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
    // const data = useLoaderData({ from: Route.id });
    const sidebarData: SidebarData = {name:''}; 

    return (
      <div className="bg-background flex h-full w-full flex-row self-stretch">
        <Sidebar 
          stages={stagesSidebar}
          interfaceOption={''}
          DetailsComponent={SidebarDetails}
          data={sidebarData}
          DetailsComponentMobile={SidebarDetailsMobile}
        />
        <div className="flex w-full flex-col gap-6 overflow-auto px-4 pb-6 lg:px-8">
          <div className='flex flex-col items-center justify-center h-full grow'>My Action area</div>
        </div>
      </div>
    );
}
