import type { Trigger } from '@insertlogic/o8-lib';

//@logic-context
export type GetChildrenByIdContext = {
  id: string;
  children?: Trigger[];
};
