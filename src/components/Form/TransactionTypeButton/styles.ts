import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)<{
  isActive?: boolean;
  type: "positive" | "negative";
}>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme, isActive }) =>
    isActive ? "transparent" : theme.colors.shape};
  border-radius: 5px;

 ${({ isActive, type }) =>
   isActive &&
   type === "positive" &&
   css`
     background-color: ${({ theme }) => theme.colors.success_light};
   `})}

  ${({ isActive, type }) =>
    isActive &&
    type === "negative" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `})}
   

  padding: 16px;
`;

export const Icon = styled(Feather)<{ type: "positive" | "negative" }>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text}
  font-size: ${RFValue(14)}px;
`;
