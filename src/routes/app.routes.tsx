import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// screens
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

export type AppRoutesParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: theme.colors.text,
        tabBarActiveBackgroundColor: theme.colors.primary,
        tabBarInactiveBackgroundColor: theme.colors.primary,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          borderTopWidth: 0,
          height: 50,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
