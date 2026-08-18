import type { StageType } from '@insertlogic/o8-lib';

export const apiStatus = {
  getById: () => 200,
  get: () => 200,
  delete: () => 204,
  create: () => 200,
  update: () => 200,
  importData: () => 204,
};

export const apiRoutes = {
  whoAmI: () => `/api/whoami`,
  getRuntimeByState: (state: StageType) => `/api/runtime?state=${state}`,
  getRuntimeByQuery: (queryString: string) => `/api/runtime?${queryString}`,
  createRuntime: (name: string) => `/api/runtime/create/logic_name/${name}`,
  visitNext: (name: string) => `/api/runtime/visit_next/${name}`,
};
