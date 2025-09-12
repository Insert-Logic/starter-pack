import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { SidebarDetails } from 'components/sidebar-details';
import { MainContentLayout, taskService } from '@insertlogic/o8-lib';
import { tasksMock } from '../../../-mock';
import type { SidebarData } from '../../-context';
import { stages } from '../../-util/logic-steps';
import { ExampleUI } from '../-components';

const service = {
  getById: async function (id: string) {
    if (id === 'preview') {
      // Return mock data
      let data = tasksMock[0];
      data.targetAssignment = { interfaceOption: 'first-step', _id: '', name: '' };
      return data;
    } else {
      const data = await taskService.getById(id);
      return data;
    }
  },
};

export const Route = createFileRoute('/sample-logic/ui-1/$id/')({
  loader: async ({ params }) => {
    const id = params.id!;
    return await service.getById(id);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });
  const sidebarData: SidebarData = { name: 'Ola Nordmann' };

  return (
    <MainContentLayout
      currentStep={data.targetAssignment?.interfaceOption ?? ''}
      steps={stages}
      title={'Steps Overview'}
      defaultCollapsed={false}
      keyDetails={<SidebarDetails data={sidebarData} />}
      keyDetailsDefaultCollapsed={true}
      keyDetailsTitle={'Key Information'}
      showRightDrawer={true}
      rightDrawerDefaultCollapsed={true}
      rightDrawerTitle="Process Details">
      <ExampleUI />
    </MainContentLayout>
  );
}
