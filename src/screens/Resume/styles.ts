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
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const SelectMonth = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 12px 24px;
`;

export const SelectMonthButton = styled.TouchableOpacity``;

export const SelectMonthButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Month = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const Content = styled.View``;

export const CategoriesList = styled.FlatList`
  padding: 24px;
`;
