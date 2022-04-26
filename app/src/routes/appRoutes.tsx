import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import LoggedOnRoutesTabs from "./loggedOnTabs.routes";
import AddMatches from "../screens/Matches/addMatche";
import Profile from "../screens/Profile";
import Friends from "../screens/Friends";
import MyMatches from "../screens/Matches/MyMatches";
import Notifications from "../screens/Notifications";
import AddLocations from "../screens/Locations/addLocations";
import InviteUsers from "../screens/Users/InveteUsers";
import EditProfile from "../screens/Profile/editProfile";
import AlterPassword from "../screens/Profile/alterPass";
import MyLocals from "../screens/Locations/myLocals";
import EditLocals from "../screens/Locations/editLocals";

const AppStack = createStackNavigator();

// eslint-disable-next-line react/function-component-definition
const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      // animationTypeForReplace: "pop",
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
    <AppStack.Screen name="alterPass" component={AlterPassword} />
    <AppStack.Screen name="Mylocals" component={MyLocals} />
    <AppStack.Screen name="Editlocals" component={EditLocals} />
  </AppStack.Navigator>
);

export default AppRoutes;
