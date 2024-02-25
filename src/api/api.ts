import axios from 'axios';
import { MealDetailsTypes } from '../types/mealTypes';

export const fetchMealsWithOffset = async (offset: number) => {
    const PagginatedMealsUrl = `https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/4/offset/${offset}`;
    try {
        const response = await axios.get(PagginatedMealsUrl);
        console.log('response.data', response.data);

        const data = await response.data;
        return data.meal_roulette_app_meals_aggregate.nodes;
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
};

export const fetchMealDetails = async (
    mealId: number,
): Promise<MealDetailsTypes | undefined> => {
    try {
        const response = await axios.get(
            `https://playground.devskills.co/api/rest/meal-roulette-app/meals/${mealId}`,
        );
        const data = await response.data;
        return data.meal_roulette_app_meals_by_pk as MealDetailsTypes;
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
};
