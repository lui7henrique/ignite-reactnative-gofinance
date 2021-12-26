import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(80)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title}
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<{ isActive: boolean }>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.shape : theme.colors.background};
`;

export const CategoryIcon = styled(Feather)<{ color: string }>`
  color: ${({ color }) => color}
  font-size: ${RFValue(24)}px;
  margin-right: 16px;
  opacity: 0.5;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text}
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
