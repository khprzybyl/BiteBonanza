import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MealSelection } from './src/screens/MealSelection';
import { MealDetails } from './src/screens/MealDetails';
import { RootStackParamList } from './src/types/navigationTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MealSelection"
                        component={MealSelection}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="MealDetails" component={MealDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}
