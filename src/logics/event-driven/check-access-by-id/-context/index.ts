import type { User } from 'types/index';

//@logic-context
export type CheckAccessById = {
  // Input
  input: CheckAccessByIdInput;

  // Find from utility
  data?: CheckAccessByIdData;

  // Create
  response?: CheckAccessByIdResponse;
};

export type CheckAccessByIdInput = {
  id: string;
  workQueue: string;
};

export type CheckAccessByIdData = {
  user: User;
  workQueueRoles: string[];
};

export type CheckAccessByIdResponse = {
  access: boolean;
  userRoles: string[];
  allowedRoles: string[];
};
