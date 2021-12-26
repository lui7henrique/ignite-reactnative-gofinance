import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { format } from "date-fns";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import * as S from "./styles";
import { formatToBRL } from "../../utils/formatBRL";
import { categories } from "../../utils/categories";
import theme from "../../global/styles/theme";
import { numberify } from "../../utils/numberify";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

type HighlightProps = {
  amount: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
};

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  let expensiveTotal = 0;

  const loadTransactions = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];

    const transactions: DataListProps[] = data.map((item: DataListProps) => {
      const amount = formatToBRL(+item.amount);
      const date = format(new Date(item.date), "dd/MM/yy");

      return {
        ...item,
        amount,
        date,
      };
    });

    setTransactions(transactions);

    const entriesTotal = transactions
      .filter((item) => item.type === "positive")
      .reduce((acc, item) => acc + numberify(item.amount), 0);

    const expensivesTotal = transactions
      .filter((item) => item.type === "negative")
      .reduce((acc, item) => acc + numberify(item.amount), 0);

    setHighlightData({
      entries: {
        amount: formatToBRL(entriesTotal),
      },
      expensives: {
        amount: formatToBRL(expensivesTotal),
      },
      total: {
        amount: formatToBRL(entriesTotal - expensivesTotal),
      },
    });
    setIsLoading(false);
  };

  // TO DO - REMOVER
  const resetTransactions = () => {
    AsyncStorage.removeItem("@gofinances:transactions");
    loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserContainer>
              <S.UserInfo>
                <S.UserAvatar
                  source={{ uri: "https://github.com/lui7henrique.png" }}
                />
                <S.User>
                  <S.UserWelcome>Bem vindo,</S.UserWelcome>
                  <S.UserName>Luiz Henrique</S.UserName>
                </S.User>
              </S.UserInfo>
              <S.Icon name="power" size={24} onPress={resetTransactions} />
            </S.UserContainer>
          </S.Header>

          <S.HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction="Última entrada dia 05 de dezembro"
              type="positive"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction="Última saída dia 03 de abril"
              type="negative"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="01 à 16 de abril"
              type="total"
            />
          </S.HighlightCards>

          <S.Transactions>
            <S.Title>
              {transactions && transactions.length >= 1
                ? "Histórico de transações"
                : "Não há transações recentes."}
            </S.Title>

            <S.TransactionsList
              data={transactions}
              renderItem={({ item }) => (
                <TransactionCard {...(item as TransactionCardProps)} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}
