import ToastMessage, {
  BaseToast,
  ErrorToast,
} from "react-native-toast-message";
import React from "react";
import theme from "../../global/styles/theme";
import { StatusBar } from "react-native";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.success,
        backgroundColor: theme.colors.shape,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "400",
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.colors.attention,
        backgroundColor: theme.colors.shape,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "400",
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
      }}
    />
  ),
};

export const Toast = () => {
  return (
    <ToastMessage
      config={toastConfig}
      position="top"
      topOffset={StatusBar.currentHeight! + 20}
    />
  );
};
