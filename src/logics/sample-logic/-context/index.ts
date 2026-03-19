import type { RuntimeByStateResponse } from '@insertlogic/o8-lib';

//@logic-context
export type YourLogic = {};

export type TaskLogic = Omit<RuntimeByStateResponse, 'context'> & {
  context: YourLogic;
};

export type SidebarData = {
  name: string;
};
