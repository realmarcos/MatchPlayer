import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Friends from "../screens/Friends";
import addLocations from "../screens/Locations/addLocations";
import Login from "../screens/Login";
import addMatches from "../screens/Matches/addMatche";
import MyMatches from "../screens/Matches/MyMatches";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import editProfile from "../screens/Profile/editProfile";
import Signup from "../screens/Signup";
import inviteUsers from "../screens/Users/InveteUsers";
import LoggedOnRoutesTabs from "./loggedOnTabs.routes";

/** All routes application */
const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LoggedOnRoutes" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoggedOnRoutes" component={LoggedOnRoutesTabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="addMatches" component={addMatches} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="MyMatches" component={MyMatches} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="addLocations" component={addLocations} />
      <Stack.Screen name="inviteUsers" component={inviteUsers} />
      <Stack.Screen name="editProfile" component={editProfile} />
    </Stack.Navigator>
  )
}
export default Routes;