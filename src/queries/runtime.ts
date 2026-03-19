import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { apiRoutes } from './index';
import type {
  RuntimeByStateResponse,
  RuntimeByWaitStateResponse,
  RuntimeResponse,
  StageType,
} from '@insertlogic/o8-lib';

export const runtimeService = {
  getRuntimeByState: async function (state: StageType) {
    const result = await fetch(apiRoutes.getRuntimeByState(state), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get runtime data`);
    }

    const data = (await result.json()) as RuntimeByStateResponse[] | RuntimeByWaitStateResponse[];

    return data;
  },
  getRuntimeByWorkQueue: async function (workQueue: string, env: string, simulation?: boolean) {
    let queryString = `state=${'task'}&work_queue=${workQueue}`;
    if (env !== 'production') {
      queryString = `${queryString}&simulation=${simulation}`;
    }
    const result = await fetch(apiRoutes.getRuntimeByQuery(queryString), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get runtime data`);
    }

    const data = (await result.json()) as RuntimeByStateResponse[];

    return data;
  },
  create: async function (data: { name: string; body: any }) {
    const result = await fetch(apiRoutes.createRuntime(data.name), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    });

    if (!result.ok) {
      throw new Error(`Not created. Status is ${result.status}`);
    }

    return (await result.json()) as RuntimeResponse;
  },
};

const isClient = typeof window !== 'undefined';

export function useGetRuntimeByStateQuery(
  state: StageType,
  options?: UseQueryOptions<RuntimeByStateResponse[] | RuntimeByWaitStateResponse[], Error>,
): UseQueryResult<RuntimeByStateResponse[] | RuntimeByWaitStateResponse[], Error> {
  return useQuery<RuntimeByStateResponse[] | RuntimeByWaitStateResponse[], Error>({
    queryKey: ['get_runtime_by_state', state],
    queryFn: () => runtimeService.getRuntimeByState(state),
    enabled: !!state && isClient,
    retry: false,
    refetchOnMount: true,
    ...options,
  });
}
