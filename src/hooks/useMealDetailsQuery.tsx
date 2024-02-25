import { useQuery } from '@tanstack/react-query';
import { fetchMealDetails } from '../api/api';

export const UseMealsQuery = (mealId: number) => {
    return useQuery({
        queryKey: ['MealDetails', mealId],
        queryFn: async () => await fetchMealDetails(mealId),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};
