import React, { useMemo } from "react";
import { format } from "date-fns";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import * as S from "./styles";

export function Dashboard() {
  const data = useMemo(
    () => [
      {
        id: 1,
        title: "Desenvolvimento de aplicativo",
        amount: "R$ 12.000,00",
        category: {
          name: "Vendas",
          icon: "dollar-sign",
        },
        date: format(new Date(), "dd/MM/yyyy"),
      },
      {
        id: 1,
        title: "Hamburgueria Pizzy",
        amount: "- R$ 59,00",
        category: {
          name: "Alimentação",
          icon: "coffee",
        },
        date: format(new Date(), "dd/MM/yyyy"),
      },
      {
        id: 1,
        title: "Hamburgueria Pizzy",
        amount: "- R$ 59,00",
        category: {
          name: "Alimentação",
          icon: "coffee",
        },
        date: format(new Date(), "dd/MM/yyyy"),
      },
      {
        id: 1,
        title: "Hamburgueria Pizzy",
        amount: "- R$ 59,00",
        category: {
          name: "Alimentação",
          icon: "coffee",
        },
        date: format(new Date(), "dd/MM/yyyy"),
      },
    ],
    []
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
          <S.Icon name="power" size={24} />
        </S.UserContainer>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 05 de dezembro"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Transações</S.Title>
        <S.TransactionsList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard {...(item as typeof data[0])} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
        {/* <S.TransactionsList data={data} renderItem={({item} => <TransactionCard key={item.id} {...item} /></S.Transactions>)}>
            return ;
          })}
        </S.TransactionsList> */}
      </S.Transactions>
    </S.Container>
  );
}
