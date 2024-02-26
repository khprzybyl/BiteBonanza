import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { MealSelection } from '../MealSelection';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: jest.fn(),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

const renderWithClient = (ui) => {
    const testQueryClient = createTestQueryClient();
    return {
        ...render(
            <QueryClientProvider client={testQueryClient}>
                <NavigationContainer>{ui}</NavigationContainer>
            </QueryClientProvider>,
        ),
        testQueryClient,
    };
};

const mockMealsData = [
    { id: 1, title: 'Spaghetti', picture: 'http://example.com/spaghetti.jpg' },
    { id: 2, title: 'Risotto', picture: 'http://example.com/risotto.jpg' },
    { id: 3, title: 'Pizza', picture: 'http://example.com/pizza.jpg' },
];

describe('MealSelection Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useQuery.mockImplementation(({ queryKey }) => {
            if (queryKey[0] === 'mealsData') {
                return {
                    isLoading: false,
                    isError: false,
                    data: mockMealsData,
                    isSuccess: true,
                };
            }
            return { isLoading: true };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders meals when fetched successfully', async () => {
        const { getByText } = renderWithClient(<MealSelection />);
        await waitFor(() => {
            expect(getByText('Spaghetti')).toBeTruthy();
            expect(getByText('Risotto')).toBeTruthy();
            expect(getByText('Pizza')).toBeTruthy();
        });
    });

    it('shows loading indicator initially', () => {
        useQuery.mockReturnValue({ isLoading: true });
        const { getByTestId } = renderWithClient(<MealSelection />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('displays an error message when the meals fetch fails', async () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: true,
            error: { message: 'Error fetching meals' },
            data: undefined,
        });

        const { getByText } = renderWithClient(<MealSelection />);
        await waitFor(() => {
            expect(
                getByText(
                    'Chopping onions made our server cry. Hang in there!',
                ),
            ).toBeTruthy();
        });
    });

    it('navigates to MealDetails screen when a meal is pressed', async () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockMealsData,
        });

        const { getByTestId } = renderWithClient(<MealSelection />);
        await waitFor(() => {
            fireEvent.press(getByTestId('meal-item-1'));
        });
        expect(mockNavigate).toHaveBeenCalledWith('MealDetails', { mealId: 1 });
    });

    it('handles refresh action', async () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockMealsData,
        });

        const { getByText } = renderWithClient(<MealSelection />);
        await waitFor(() => {
            fireEvent.press(getByText('REFRESH'));
        });
    });
});
