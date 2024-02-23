import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MealSelection } from './src/screens/MealSelection';
import { MealDetails } from './src/screens/MealDetails';
import { RootStackParamList } from './src/types/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
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
