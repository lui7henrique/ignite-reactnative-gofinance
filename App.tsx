import React from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Toast } from "./src/components/Toast";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="#5636d3" style="light" />
      <AuthProvider>
        <Routes />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}
