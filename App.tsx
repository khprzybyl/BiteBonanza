import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MealSelection } from './src/screens/MealSelection.tsx';
import { MealDetails } from './src/screens/MealDetails.tsx';

const Stack = createStackNavigator();

export default function App() {
    const onBack = () => {
        navigation.goBack();
    };

    return (
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
    );
}
