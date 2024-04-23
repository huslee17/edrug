import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screen/login';
import HomeScreen from './screen/home';
import RegisterScreen from './screen/register';
import DrawerContentScreen from './screen/DrawerContent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    > 
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator drawerContent={() => <DrawerContentScreen />}>
        <Drawer.Screen name="Home" component={TabNavigator} options={{headerLeft: () => null,}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
