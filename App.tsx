import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from 'styled-components/native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { Routes } from '@src/routes';

import theme from '@src/theme';

import { AuthProvider, useAuth } from '@hooks/auth';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "EventEmitter.removeListener('url', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`."
])

export default function App() {

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    'NexaBold': require('./src/assets/fonts/NexaBold.otf'),
    'NexaLight': require('./src/assets/fonts/NexaLight.otf'),
    'Geometria': require('./src/assets/fonts/Geometria.otf'),
    'GeometriaLight': require('./src/assets/fonts/GeometriaLight.otf'),
    'GeometriaMedium': require('./src/assets/fonts/GeometriaMedium.otf'),
  });

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <GestureHandlerRootView
    style={{
      flex: 1
    }}
    >
      <ThemeProvider theme={theme}>
        <StatusBar style='light' translucent backgroundColor='transparent' />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
