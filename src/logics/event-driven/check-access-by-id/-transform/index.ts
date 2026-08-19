import type { CheckAccessById } from '../-context';

const hasAccess = (userRoles: string[], allowedRoles: string[]): boolean => {
  if (userRoles.includes('admin')) return true;
  if (allowedRoles.length === 0) return true;
  return userRoles.some(role => allowedRoles.includes(role));
};

export type LockAccess = {
  hasLock: boolean;
};

const createTransform = (context: CheckAccessById) => {
  const userRoles = context.data?.user.roles ?? [];
  const allowedRoles = context.data?.workQueueRoles ?? [];

  const access = hasAccess(userRoles, allowedRoles);

  context.response = {
    access: access,
    allowedRoles: allowedRoles,
    userRoles: userRoles,
  };
};

export default createTransform;
