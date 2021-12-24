import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import * as S from "./styles";

export function Dashboard() {
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
          lastTransaction="Última entrada dia 13 de abril"
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
    </S.Container>
  );
}
