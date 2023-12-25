/* eslint-disable react/react-in-jsx-scope */
// Import the createStackNavigator function from the @react-navigation/stack package
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import {Routes} from './Routes';

// Create a Stack variable using the createStackNavigator function
const Stack = createStackNavigator();

// Define the MainNavigation component
const MainNavigation = () => {
  // Return the navigation structure for the app
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Stack.Navigator
      // Set the initial route to the Home screen
      initialRouteName={'Home'}
      screenOptions={{header: () => null, headerShown: false}}>
      {/* Define the Home screen */}
      <Stack.Screen name={Routes.Home} component={Home} />
      {/* Define the Profile screen */}
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

// Export the MainNavigation component as the default export of this file
export default MainNavigation;
