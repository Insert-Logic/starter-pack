import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { runtimeService } from './runtime';
import type { RuntimeResponse } from '@insertlogic/o8-lib';
import { mergeRuntimeContexts } from 'util/index';
import type { GetContextByIds } from 'api/get-context-by-ids/-context';
import type { RuntimeByStateResponse } from 'types/api-response';

export type DashboardData = {
  items: RuntimeByStateResponse[];
};

export const dashboardService = {
  getData: async function () {
    // Get tasks
    const waitTasks = (await runtimeService.getRuntimeByState('wait')) as RuntimeByStateResponse[]; // runtime at the wait node
    const regularTasks = (await runtimeService.getRuntimeByState('task')) as RuntimeByStateResponse[]; // runtime at the task node
    const allTasks = [...(regularTasks ?? []), ...(waitTasks ?? [])];

    const waitIds = waitTasks?.map(w => w._id.$oid) ?? [];
    const tasksIds = regularTasks?.map(w => w._id.$oid) ?? [];

    const taskBody: GetContextByIds = {
      ids: [...tasksIds, ...waitIds],
    };

    const contextResponse = (await runtimeService.create({
      name: 'get-context-by-ids',
      body: taskBody,
    })) as RuntimeResponse;

    const newItems = mergeRuntimeContexts(allTasks, contextResponse.context.items);

    // Map to specific type for your specific dashboard UI
    return newItems;
  },
};

const isClient = typeof window !== 'undefined';

export function useGetDashboardDataQuery(options?: UseQueryOptions<any, Error>): UseQueryResult<DashboardData, Error> {
  return useQuery<DashboardData, Error>({
    queryKey: ['get_dashboard_data'],
    queryFn: () => dashboardService.getData(),
    enabled: isClient,
    retry: false,
    refetchOnMount: true,
    ...options,
  });
}
