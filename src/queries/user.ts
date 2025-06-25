import type { User } from 'types/index';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { apiRoutes } from '.';


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
    onSettled: () => {},
  } as UseQueryOptions<User, Error>);
}