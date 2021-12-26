import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import pt from "date-fns/locale/pt";

import { format } from "date-fns";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import * as S from "./styles";
import theme from "../../global/styles/theme";

import { formatToBRL } from "../../utils/formatBRL";
import { formatDateMMDDYYYY } from "../../utils/formatDateMMDDYYYY";
import { numberify } from "../../utils/numberify";
import { formatTotalIntervalMessage } from "../../utils/formatTotalIntervalMessage";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

type HighlightProps = {
  amount: string;
  lastTransaction: string;
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

    const entries = transactions.filter((item) => item.type === "positive");
    const entriesTotal = entries.reduce(
      (acc, item) => acc + numberify(item.amount),
      0
    );
    const lastEntryDate = format(
      Math.max.apply(
        Math,
        entries.map((item) => new Date(formatDateMMDDYYYY(item.date)).getTime())
      ),
      "'Última entrada dia' dd 'de' MMMM'",
      {
        locale: pt,
      }
    );

    const expansives = transactions.filter((item) => item.type === "negative");
    const expensivesTotal = expansives.reduce(
      (acc, item) => acc + numberify(item.amount),
      0
    );
    const lastExpensiveDate = format(
      Math.max.apply(
        Math,
        expansives.map((item) =>
          new Date(formatDateMMDDYYYY(item.date)).getTime()
        )
      ),
      "'Última saída dia' dd 'de' MMMM'",
      {
        locale: pt,
      }
    );

    const firstTransactionDate = Math.min.apply(
      Math,
      transactions.map((item) =>
        new Date(formatDateMMDDYYYY(item.date)).getTime()
      )
    );

    const lastTransactionDate = Math.max.apply(
      Math,
      transactions.map((item) =>
        new Date(formatDateMMDDYYYY(item.date)).getTime()
      )
    );

    const totalInterval = formatTotalIntervalMessage(
      firstTransactionDate,
      lastTransactionDate
    );

    setTransactions(transactions);

    setHighlightData({
      entries: {
        amount: formatToBRL(entriesTotal),
        lastTransaction: lastEntryDate,
      },
      expensives: {
        amount: formatToBRL(expensivesTotal),
        lastTransaction: lastExpensiveDate,
      },
      total: {
        amount: formatToBRL(entriesTotal - expensivesTotal),
        lastTransaction: totalInterval,
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
              lastTransaction={highlightData.entries.lastTransaction}
              type="positive"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="negative"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
