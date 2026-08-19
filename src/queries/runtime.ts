import { useMutation, useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { apiRoutes, apiStatus } from './index';
import { showToast, type RuntimeResponse, type StageType } from '@insertlogic/o8-lib';
import type { RuntimeByStateResponse } from 'types/api-response';

type VisitNextInput = {
  _id: string;
  context: any;
  redirect?: boolean;
};

export const runtimeService = {
  getRuntimeByState: async function (state: StageType) {
    const result = await fetch(apiRoutes.getRuntimeByState(state), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get runtime data`);
    }

    const data = (await result.json()) as RuntimeByStateResponse[];

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
  visitNext: async function ({ _id, context }: VisitNextInput) {
    if (!_id) {
      throw new Error(`Failed to send to next step. Couldn't find logic ID`);
    }

    const result = await fetch(apiRoutes.visitNext(_id.toString()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    });

    if (result.status !== apiStatus.update()) {
      throw new Error(`Failed to send to next step. Status is ${result.status}`);
    }

    return (await result.json()) as RuntimeResponse;
  },
  resolve: async function (_id: string) {
    const result = await fetch(apiRoutes.resolveRuntime(_id.toString()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.status !== apiStatus.get()) {
      throw new Error(`Failed to resolve case. Returned status ${result.status}`);
    }

    return (await result.json()) as RuntimeResponse;
  },
  delete: async function (_id: string) {
    const result = await fetch(apiRoutes.deleteRuntime(_id.toString()), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      throw new Error(`Not deleted. Returned status ${result.status}`);
    }
  },
};

export function useRuntimeResolveMutation() {
  return useMutation({
    mutationFn: runtimeService.resolve,
    mutationKey: ['runtime_resolve'],
    onSuccess: () => {
      const date = new Date();
      showToast('Resolved case successfully', `${date.toLocaleString()}`, 'default');
    },
    onError: (error, _) => {
      showToast('FAILED to resolve case', `Reason:  ${error.message}`, 'error');
    },
  });
}

export function useRuntimeDeleteMutation() {
  return useMutation({
    mutationFn: runtimeService.delete,
    onMutate: () => {},
    onError: (error: Error) => {
      showToast('FAILED to delete', `Reason: ${error.message}`, 'error');
    },
    mutationKey: ['runtime_delete'],
  });
}

const isClient = typeof window !== 'undefined';

export function useGetRuntimeByStateQuery(
  state: StageType,
  options?: UseQueryOptions<RuntimeByStateResponse[], Error>,
): UseQueryResult<RuntimeByStateResponse[], Error> {
  return useQuery<RuntimeByStateResponse[], Error>({
    queryKey: ['get_runtime_by_state', state],
    queryFn: () => runtimeService.getRuntimeByState(state),
    enabled: !!state && isClient,
    retry: false,
    refetchOnMount: true,
    ...options,
  });
}
