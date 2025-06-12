'use client';

import { useWhoAmIQuery } from 'queries/user';
import type { User } from 'context/index';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface UserProviderProps {
  children?: ReactNode;
}

type UserContextValue = {
  user: User;
};

const newUser: User = {
  _id: '',
  name: '',
  typ: '',
  roles: [],
};

export const newUserContextValue = (): UserContextValue => {
  return {
    user: newUser,
  };
};

const UserContext = createContext<UserContextValue | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const { data: user } = useWhoAmIQuery();

  const userContextValue: UserContextValue = {
    user: user ?? { _id: '', roles: [], typ: '', name: '' },
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUserProvider = (): UserContextValue => {
  const context = useContext(UserContext);
  if (context) return context;
  return newUserContextValue();
};