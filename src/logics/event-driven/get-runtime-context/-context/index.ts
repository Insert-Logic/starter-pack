import type { User } from 'types/index';

//@logic-context
export type GetRuntimeContext = {
  runtimeId: string;
  workQueue?: string;
  user?: User;
  hasAccess?: boolean;
  validRoles?: string[];
  context?: any;
};
