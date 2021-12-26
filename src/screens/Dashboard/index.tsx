import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { format } from "date-fns";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import * as S from "./styles";
import { formatToBRL } from "../../utils/formatBRL";
import { categories } from "../../utils/categories";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>();

  const loadTransactions = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];

    const transactions: DataListProps[] = data.map((item: DataListProps) => {
      const amount = `R$ ${formatToBRL(+item.amount)}`;

      const date = format(new Date(item.date), "dd/MM/yy");

      return {
        ...item,
        amount,
        date,
      };
    });

    setData(transactions);
  };

  // TO DO - REMOVER
  const resetTransactions = () => {
    AsyncStorage.removeItem("@gofinances:transactions");
    loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
    console.log("here");
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <S.Container>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 05 de dezembro"
          type="positive"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="negative"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>
          {data && data.length >= 1
            ? "Histórico de transações"
            : "Não há transações recentes."}
        </S.Title>

        <S.TransactionsList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard {...(item as TransactionCardProps)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </S.Transactions>
    </S.Container>
  );
}
