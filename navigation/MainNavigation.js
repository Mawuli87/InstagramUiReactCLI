/* eslint-disable react/react-in-jsx-scope */
// Import the createStackNavigator function from the @react-navigation/stack package
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import {Routes} from './Routes';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Create a Stack variable using the createStackNavigator function
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainMenuNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{header: () => null}}>
      <Drawer.Screen name={Routes.Home} component={Home} />
      <Drawer.Screen name={Routes.Profile} component={Profile} />
    </Drawer.Navigator>
  );
};

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
      <Stack.Screen name={'Drawer'} component={MainMenuNavigation} />
    </Stack.Navigator>
  );
};

// Export the MainNavigation component as the default export of this file
export default MainNavigation;
