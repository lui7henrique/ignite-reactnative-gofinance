import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { TextInputProps } from "react-native";

export const Container = styled.TextInput<TextInputProps>`
  width: 100%;
  border-radius: 5px;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};

  margin-bottom: 8px;
`;
