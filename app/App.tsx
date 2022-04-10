/* eslint-disable camelcase */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import Routes from "./src/routes";
import theme from "./src/theme";
import { AuthProvider } from "./src/context/Auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar translucent backgroundColor="transparent" />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
