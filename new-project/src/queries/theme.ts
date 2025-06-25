import type { Mode } from 'types/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { apiRoutes } from '.';
;

const service = {
  getTheme: async function () {
    const result = await fetch(apiRoutes.getTheme(), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to get theme`);
    }

    return (await result.text()) as Mode;
  },
  setTheme: async function (theme: Mode) {
    const result = await fetch(apiRoutes.setTheme(theme), {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`Failed to set theme`);
    }

    return await result.text();
  },
};

export function useSetThemeMutation() {
  return useMutation({
    mutationFn: service.setTheme,
    onError: () => {},
  });
}

export function useGetThemeQuery() {
  return useQuery<any, Error>({
    queryKey: ['get_theme'],
    queryFn: service.getTheme,
    retry: false,
    onSettled: () => {},
  } as UseQueryOptions<any, Error>);
}