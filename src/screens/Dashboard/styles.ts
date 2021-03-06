import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from "react-native";

import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                Header                                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFPercentage(42)}px;

  padding-top: ${RFValue(StatusBar.currentHeight! + 32)}px;
  padding-right: 24px;
  padding-left: 24px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 5px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserWelcome = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
`;

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                Cards                                       */
/*                                                                            */
/* -------------------------------------------------------------------------- */

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                                Transactions                                */
/*                                                                            */
/* -------------------------------------------------------------------------- */

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-top: ${RFPercentage(12)}px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionsList = styled.FlatList``;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
