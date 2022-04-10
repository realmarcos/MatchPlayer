import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedOnRoutesTabs from "./loggedOnTabs.routes";
import AddMatches from "../screens/Matches/addMatche";
import Profile from "../screens/Profile";
import Friends from "../screens/Friends";
import MyMatches from "../screens/Matches/MyMatches";
import Notifications from "../screens/Notifications";
import AddLocations from "../screens/Locations/addLocations";
import InviteUsers from "../screens/Users/InveteUsers";
import EditProfile from "../screens/Profile/editProfile";

const AppStack = createNativeStackNavigator();

// eslint-disable-next-line react/function-component-definition
const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="LoggedOnRoutes" component={LoggedOnRoutesTabs} />
    <AppStack.Screen name="addMatches" component={AddMatches} />
    <AppStack.Screen name="profile" component={Profile} />
    <AppStack.Screen name="Friends" component={Friends} />
    <AppStack.Screen name="MyMatches" component={MyMatches} />
    <AppStack.Screen name="Notifications" component={Notifications} />
    <AppStack.Screen name="addLocations" component={AddLocations} />
    <AppStack.Screen name="inviteUsers" component={InviteUsers} />
    <AppStack.Screen name="editProfile" component={EditProfile} />
  </AppStack.Navigator>
);

export default AppRoutes;
