import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { SidebarDetails } from 'components/sidebar-details';
import { ErrorLayout, MainContentLayout, PendingComponent } from '@insertlogic/o8-lib';
import { stages } from '../../-shared/util/logic-steps';
import { ExampleUI } from '../-components';
import { taskService } from 'queries/task';

const service = {
  getById: async function (id: string) {
    if (id === 'preview') {
      // Return mock data for your UI
      let data = { targetAssignment: { interfaceOption: 'first-step', _id: '', name: '' }, context: {} };
      return data;
    } else {
      const task = await taskService.getById(id);
      return task;
    }
  },
};

export const Route = createFileRoute('/sample-logic/ui-1/$id/')({
  loader: async ({ params }) => {
    const id = params.id!;
    return await service.getById(id);
  },
  //EXAMPLE OF QUERY DATA

  // loader: ({ context }) =>
  //   context.queryClient.fetchQuery({
  //     queryKey: ['get-projects'],
  //     queryFn: () =>
  //       runtimeService.create({
  //         name: 'handle-project-storage',
  //         body: getProjectsBody,
  //       }),
  //   }),
  pendingComponent: () => <PendingComponent />,
  errorComponent: ErrorLayout,
  component: RouteComponent,
});

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });
  const sidebarData = { name: 'Ola Nordmann' };

  const context = data?.context;

  return (
    <MainContentLayout
      currentStep={data?.targetAssignment?.interfaceOption ?? ''}
      steps={stages}
      title={'Process Overview'}
      defaultCollapsed={false}
      keyDetails={<SidebarDetails data={sidebarData} />}
      keyDetailsDefaultCollapsed={true}
      keyDetailsTitle={'Key Information'}
      showRightDrawer={false}
      rightDrawerDefaultCollapsed={true}
      rightDrawerTitle="Process Details">
      <ExampleUI />
    </MainContentLayout>
  );
}
