import React from "react";
import { StatusBar } from "expo-status-bar";

import { Dashboard } from "./src/screens/Dashboard.tsx";
import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Dashboard />
    </ThemeProvider>
  );
}
