import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View<{ color: string }>`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  padding: 12px 24px;

  border-radius: 5px;
  margin-bottom: 8px;

  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
`;
