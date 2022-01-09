import { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { InputForm } from "../../components/Form/InputForm";
import { CategorySelect } from "../../screens/CategorySelect";

import { categories } from "../../utils/categories";

import * as S from "./styles";
import { registerSchema } from "./schema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesParamList } from "../../routes/app.routes";

type FormData = {
  name: string;
  amount: string;
};

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigation = useNavigation<RegisterNavigationProps>();

  const handleSelectTransactionType = (
    transactionType: "positive" | "negative"
  ) => {
    setTransactionType(transactionType);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) {
      Toast.show({
        type: "error",
        text1: "Selecione o tipo da transação!",
      });
      return;
    }

    if (category.key === "category") {
      Toast.show({
        type: "error",
        text1: "Selecione um tipo de categoria!",
      });
      return;
    }

    const newTransaction = {
      id: String(uuid.v4()),
      ...form,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user?.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [newTransaction, ...currentData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      Toast.show({
        type: "success",
        text1: "Transação cadastrada com sucesso!",
      });

      setTransactionType("");
      setCategory(categories[0]);
      reset();
      navigation.navigate("Listagem");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar a transação!",
      });
    }
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
                type="positive"
                onPress={() => handleSelectTransactionType("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title="Saída"
                type="negative"
                onPress={() => handleSelectTransactionType("negative")}
                isActive={transactionType === "negative"}
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
