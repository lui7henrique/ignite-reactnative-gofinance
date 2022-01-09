import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity<{
  type: "positive" | "negative";
}>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ theme, type }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};

  padding: 16px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular}
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryIcon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.2;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
