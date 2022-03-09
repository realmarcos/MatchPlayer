import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Locations from '../screens/Locations';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';


/** routes for when you are logged in home (Tabs)  */
export default function LoggedOnRoutesTabs() {
  const Tab = createBottomTabNavigator();
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarLabelStyle: {
          },
          tabBarStyle: {
            backgroundColor: colors.surface,
          },
          tabBarActiveTintColor: colors.backdrop,
          tabBarInactiveTintColor: '#C7C7C7',

        }
      }
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Partidas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: 'Atletas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="users" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name="Locations"
        component={Locations}
        options={{
          tabBarLabel: 'Locais',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer-field" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}