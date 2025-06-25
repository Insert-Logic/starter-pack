'use server';

import { tasksMock } from '../-mock';

export const dashboardService = {
  getTasks: async function () {
    return tasksMock
  },
};