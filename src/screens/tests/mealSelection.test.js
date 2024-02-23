jest.mock('../../api/api', () => ({
    fetchMeals: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { fetchMeals } from '../../api/api';
import { MealSelection } from '../MealSelection';

export const mockMealsData = [
    { id: 1, title: 'Spaghetti', picture: 'http://example.com/spaghetti.jpg' },
    { id: 2, title: 'Pizza', picture: 'http://example.com/pizza.jpg' },
    { id: 3, title: 'Risotto', picture: 'http://example.com/risotto.jpg' },
    { id: 4, title: 'Penne', picture: 'http://example.com/penne.jpg' },
];

fetchMeals.mockResolvedValue(mockMealsData);

describe('MealSelection Screen', () => {
    it('renders meals when fetched successfully', async () => {
        const { getByText } = render(<MealSelection />);
        await act(async () => {});

        expect(getByText('Spaghetti')).toBeTruthy();
        expect(getByText('Pizza')).toBeTruthy();
        expect(getByText('Risotto')).toBeTruthy();
        expect(getByText('Penne')).toBeTruthy();
    });

    it('shows loading indicator while fetching meals', () => {
        const { getByTestId } = render(<MealSelection />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('displays an error message when the meals fetch fails', async () => {
        fetchMeals.mockRejectedValue(new Error('Network Error'));
        const { findByText } = render(<MealSelection />);

        const errorMessage = await findByText('Error fetching meals');
        expect(errorMessage).toBeTruthy();
    });

    it('handles refresh action', async () => {
        const { getByText } = render(<MealSelection />);

        const refreshButton = getByText('REFRESH');
        fireEvent.press(refreshButton);

        await act(async () => {});
    });

    it('navigates to MealDetails screen when a meal is pressed', async () => {
        fetchMeals.mockResolvedValueOnce(mockMealsData);
        const { getByTestId } = render(<MealSelection />);

        await waitFor(() => {
            expect(getByTestId('meal-item-1')).toBeTruthy();
        });

        fireEvent.press(getByTestId('meal-item-1'));

        expect(mockNavigate).toHaveBeenCalledWith('MealDetails', { mealId: 1 });
    });
});
