import React from "react";

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
    </S.Container>
  );
}
