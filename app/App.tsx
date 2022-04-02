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
        <StatusBar translucent backgroundColor="transparent" />
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
