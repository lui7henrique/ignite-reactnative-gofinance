import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacityProps } from "react-native";

export const Container = styled.TouchableOpacity.attrs<TouchableOpacityProps>({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 8px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  padding: 16px;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.support};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.support};
  font-size: ${RFValue(14)}px;
`;
