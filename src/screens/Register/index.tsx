import { useState } from "react";
import * as S from "./styles";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");

  const handleSelectTransactionType = (transactionType: "up" | "down") => {
    setTransactionType(transactionType);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.Form>
        <S.Fields>
          <Input placeholder="Título" />
          <Input placeholder="Preço" />
          <S.TransactionsTypes>
            <TransactionTypeButton
              title="Entrada"
              type="up"
              onPress={() => handleSelectTransactionType("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Saída"
              type="down"
              onPress={() => handleSelectTransactionType("down")}
              isActive={transactionType === "down"}
            />
          </S.TransactionsTypes>
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
};
