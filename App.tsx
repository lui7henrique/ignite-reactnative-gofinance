import React from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./src/routes/app.routes";

import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Toast } from "./src/components/Toast";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <NavigationContainer>
        <AppRouter />
        <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
}
