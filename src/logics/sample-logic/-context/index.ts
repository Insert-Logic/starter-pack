import type { Task } from 'types/index';

//@logic-context
export type YourLogic = {

};

export type TaskLogic = Omit<Task, 'context'> & {
  context: YourLogic;
};

export type SidebarData = {
  name: string
};