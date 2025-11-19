import { useMutation } from '@tanstack/react-query';
import { apiRoutes } from './index';
import type { Task } from 'types/index';
import { showToast } from '@insertlogic/o8-lib';

export const taskService = {
  get: async function () {
    const result = await fetch(apiRoutes.getTasks(), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get tasks`);
    }

    const data = (await result.json()) as Task[];

    return data;
  },
  getById: async function (id: string) {
    const result = await fetch(apiRoutes.getTaskById(id), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get case with id ${id}`);
    }

    return (await result.json()) as Task;
  },
  getDetailsWithMutation: async function (id: string) {
    const result = await fetch(apiRoutes.getTaskDetailsWithMutation(id), {
      method: 'POST',
    });

    if (!result.ok) {
      throw new Error(`Failed to get case with id ${id}`);
    }

    return (await result.json()) as Task;
  },
  unlockTask: async function (id: string) {
    const result = await fetch(apiRoutes.removeTaskLock(id), {
      method: 'POST',
    });

    if (!result.ok) {
      throw new Error(`Failed to unlock case with id ${id}`);
    }

    return await result.json();
  },
};

export function useRemoveTaskLockByIdMutation() {
  return useMutation({
    mutationFn: taskService.unlockTask,
    onMutate: () => {},
    onError: error => {
      showToast('FAILED to remove task lock', `Reason: ${error?.message}`, 'error');
    },
    mutationKey: ['remove_task_lock'],
  });
}
