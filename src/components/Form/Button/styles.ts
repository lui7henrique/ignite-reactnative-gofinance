import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { TouchableOpacityProps } from "react-native";

export const Container = styled.TouchableOpacity<TouchableOpacityProps>`
  width: 100%;
  border-radius: 5px;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
