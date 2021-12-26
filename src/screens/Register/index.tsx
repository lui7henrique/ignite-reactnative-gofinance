import { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { InputForm } from "../../components/Form/InputForm";

import { CategorySelect } from "../../screens/CategorySelect";

import { categories } from "../../utils/categories";

import * as S from "./styles";
import { registerSchema } from "./schema";

type FormData = {
  name: string;
  amount: string;
};

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleSelectTransactionType = (transactionType: "up" | "down") => {
    setTransactionType(transactionType);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selcione um tipo de categoria");

    const data = {
      ...form,
      category: category.key,
      transactionType,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="title"
              placeholder="Título"
              control={control}
              autoCorrect={false}
              error={errors.title && errors.title.message}
            />

            <InputForm
              name="amount"
              placeholder="Preço"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenCategoryModal()}
            />
          </S.Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategory}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
