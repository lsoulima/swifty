import { NavigationContainer } from '@react-navigation/native';
import Search from './screens/Search';
import Splash from './screens/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
