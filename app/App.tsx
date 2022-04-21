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
import FlashMessage from "react-native-flash-message";
import Routes from "./src/routes";
import theme from "./src/theme";
import { AuthProvider } from "./src/context/Auth";
import "react-native-gesture-handler";

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
          <FlashMessage position="top" />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
