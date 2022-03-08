import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Locations from '../screens/Locations';


/** routes for when you are logged in home (Tabs)  */
export default function LoggedOnRoutesTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Locations" component={Locations} />
    </Tab.Navigator>
  );
}