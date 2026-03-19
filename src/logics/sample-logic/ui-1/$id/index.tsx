import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { SidebarDetails } from 'components/sidebar-details';
import { ErrorLayout, MainContentLayout, runtimeService, type RuntimeByStateResponse } from '@insertlogic/o8-lib';
import type { SidebarData } from '../../-context';
import { stages } from '../../-shared/util/logic-steps';
import { ExampleUI } from '../-components';
import { tasksMock } from 'util/mock-data';
import { PendingComponent } from 'components/pending-component';

const service = {
  getById: async function (id: string) {
    if (id === 'preview') {
      // Return mock data
      let data = tasksMock[0];
      data.targetAssignment = { interfaceOption: 'first-step', _id: '', name: '' };
      return data;
    } else {
      const tasks = (await runtimeService.getRuntimeByState('task')) as RuntimeByStateResponse[];
      const currentTask = tasks.find(t => t._id === id);

      // Create a flow to get context for task
      // const newBody: GetInphasingContext = {
      //   runtimeId: id,
      //   workQueue: workQueue,
      // };

      // const contextResponse = (await runtimeService.create({
      //   name: 'get-in-phasing-context',
      //   body: newBody,
      // })) as any;
      // const newTask = {
      //   ...currentTask,
      //   context: contextResponse.context.context,
      // };

      return currentTask;
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
  //         name: 'mtt-handle-project-storage',
  //         body: getProjectsBody,
  //       }),
  //   }),
  pendingComponent: () => <PendingComponent />,
  errorComponent: ErrorLayout,
  component: RouteComponent,
});

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });
  const sidebarData: SidebarData = { name: 'Ola Nordmann' };

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
      showRightDrawer={true}
      rightDrawerDefaultCollapsed={true}
      rightDrawerTitle="Process Details">
      <ExampleUI />
    </MainContentLayout>
  );
}
