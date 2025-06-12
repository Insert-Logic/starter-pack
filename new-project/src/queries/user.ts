import type { User } from 'context/index';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { apiRoutes } from '.';
// import {  } from '@insertlogic/o8-lib'

const service = {
  whoAmI: async function () {
    const result = await fetch(apiRoutes.whoAmI(), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get user info`);
    }

    return (await result.json()) as User;
  },
};

export function useWhoAmIQuery() {
  return useQuery<User, Error>({
    queryKey: ['whoAmI'],
    queryFn: service.whoAmI,
    retry: false,
    onSettled: (_data: User, error: Error) => {
      // if (error) {
      //   toast({
      //     variant: 'destructive',
      //     title: 'FAILED to get user info',
      //     description: `Reason: ${error.message}`,
      //   });
      // }
    },
  } as UseQueryOptions<User, Error>);
}