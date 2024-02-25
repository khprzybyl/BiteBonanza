import { useQuery } from '@tanstack/react-query';
import { fetchMealsWithOffset } from '../api/api';

export const UseMealsQuery = (offset: number) => {
    return useQuery({
        queryKey: ['mealsData', offset],
        queryFn: async () => await fetchMealsWithOffset(offset),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};
