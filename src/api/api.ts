import { Meal } from '../types/mealTypes';
import { MealDetailsTypes } from '../types/mealTypes';

export const fetchMeals = async (
    limit = 4,
    offset = 0,
): Promise<Meal[] | undefined> => {
    try {
        const url = `https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/${limit}/offset/${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.meal_roulette_app_meals_aggregate.nodes as Meal[];
    } catch (error) {
        console.error('Error fetching meals', error);
    }
};

export const fetchMealDetails = async (
    mealId: number,
): Promise<MealDetailsTypes | undefined> => {
    try {
        const response = await fetch(
            `https://playground.devskills.co/api/rest/meal-roulette-app/meals/${mealId}`,
        );
        const data = await response.json();
        return data.meal_roulette_app_meals_by_pk as MealDetailsTypes;
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
};
