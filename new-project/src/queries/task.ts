import { apiRoutes } from './index';
import type { Task } from 'types/index';

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
};
