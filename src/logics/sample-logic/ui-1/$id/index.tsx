import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { SidebarDetails } from 'components/sidebar-details';
import { AccessDeniedError, ErrorLayout, MainContentLayout, PendingComponent } from '@insertlogic/o8-lib';
import { stages } from '../../-shared/util/logic-steps';
import { ExampleUI } from '../-components';
import { taskService } from 'queries/task';
import type { CheckAccessById } from 'logics/event-driven/check-access-by-id/-context';
import { runtimeService } from 'queries/runtime';
import { getAccessDeniedMessage } from 'util/index';

const service = {
  getById: async function (id: string) {
    // Get current task
    const data = await taskService.getById(id);
    const currentWorkQueue = data.targetAssignment?.workQueue ?? '';
    // Checkk access
    const checkAccessBody: CheckAccessById = {
      input: { id: id, workQueue: currentWorkQueue },
    };
    const accessDetailsResponse = await runtimeService.create({
      name: 'check-access-by-id',
      body: checkAccessBody,
    });

    const accessDetailsContext = accessDetailsResponse.context as CheckAccessById;
    const accessDetails = accessDetailsContext.response;
    return { data: data, accessDetails: accessDetails };
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
  // const { id } = Route.useParams();
  const loaderData = useLoaderData({ from: Route.id });
  const data = loaderData.data;
  const accessDetails = loaderData.accessDetails;

  if (accessDetails?.access !== true) {
    const message = getAccessDeniedMessage(accessDetails?.userRoles ?? [], accessDetails?.allowedRoles ?? []);

    return <AccessDeniedError description={message} />;
  }

  const sidebarData = { name: 'Ola Nordmann' };

  // const context = data?.context;

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
