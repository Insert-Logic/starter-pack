import type { Trigger } from 'types/api-response';

//@logic-context
export type GetChildrenByIdContext = {
  id: string;
  children?: Trigger[];
};
