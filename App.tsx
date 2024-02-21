import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MealSelection } from './src/screens/MealSelection.tsx';
import { MealDetails } from './src/screens/MealDetails.tsx';

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }} > 
        <Stack.Screen name="MealSelection" component={MealSelection} />
        <Stack.Screen name="MealDetails" component={MealDetails}/>
      </Stack.Navigator>
     </NavigationContainer>
  );
}
