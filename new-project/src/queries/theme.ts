import type { Mode } from 'context/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { apiRoutes } from '.';
// import { toast } from 'ui/use-toast';

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
    onError: (error, _) => {
    //   toast({
    //     variant: 'destructive',
    //     title: 'FAILED to set theme',
    //     description: `Reason:  ${error.message}`,
    //   });
    },
  });
}

export function useGetThemeQuery() {
  return useQuery<any, Error>({
    queryKey: ['get_theme'],
    queryFn: service.getTheme,
    retry: false,
    onSettled: (data: Mode, error: Error) => {
      if (error) {
        // toast({
        //   variant: 'destructive',
        //   title: 'FAILED to get theme',
        //   description: `Reason: ${error.message}`,
        // });
      } else {
        console.log(data);
      }
    },
  } as UseQueryOptions<any, Error>);
}