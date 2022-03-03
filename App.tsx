import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme'
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';

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
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
