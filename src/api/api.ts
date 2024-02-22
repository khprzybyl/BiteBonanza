export const fetchMeals = async (limit = 4, offset = 0) => {
    try {
        const url = `https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/${limit}/offset/${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.meal_roulette_app_meals_aggregate.nodes;
    } catch (error) {
        console.error('Error fetching meals', error);
    }
};

export const fetchMealDetails = async (mealId) => {
    try {
        const response = await fetch(
            `https://playground.devskills.co/api/rest/meal-roulette-app/meals/${mealId}`,
        );
        const data = await response.json();
        return data.meal_roulette_app_meals_by_pk;
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
};
