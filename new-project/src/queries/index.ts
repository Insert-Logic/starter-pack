import type { Mode } from "types/index";

export const apiStatus = {
  getById: () => 200,
  get: () => 200,
  delete: () => 204,
  create: () => 200,
  update: () => 200,
  importData: () => 204,
};

export const apiRoutes = {
  setTheme: (theme: Mode) => `/api/theme/set_theme?theme=${theme}`,
  getTheme: () => `/api/theme/get_theme`,
  whoAmI: () => `/api/whoami`,
  getTasks: () => `/api/task`,
  getTaskById: (id: string) => `/api/task/${id}`,
  getTaskDetailsWithMutation: (id: string) => `/api/task/${id}`,
};