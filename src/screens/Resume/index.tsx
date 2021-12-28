import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ListRenderItem } from "react-native";

import { HistoryCard } from "../../components/HistoryCard";

import { Transaction } from "../../types/transaction";
import { categories } from "../../utils/categories";
import { formatToBRL } from "../../utils/formatBRL";

import * as S from "./styles";

type Category = {
  name: string;
  total: string;
  color: string;
};

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expansives = responseFormatted.filter(
        (transaction: Transaction) => transaction.type === "negative"
      );

      const totalByCategory: Array<Category> = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expansives.forEach((transaction: Transaction) => {
          if (transaction.category === category.key) {
            categorySum += +transaction.amount;
          }
        });

        if (categorySum > 0) {
          totalByCategory.push({
            name: category.name,
            total: formatToBRL(categorySum),
            color: category.color,
          });
        }
      });

      setTotalByCategories(totalByCategory);
    } catch (err) {}
  };

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <HistoryCard title={item.name} amount={item.total} color={item.color} />
  );

  useEffect(() => {
    loadData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo de gastos</S.Title>
      </S.Header>
      <S.Content>
        <S.CategoriesList
          data={totalByCategories}
          renderItem={renderItem as ListRenderItem<unknown>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </S.Content>
    </S.Container>
  );
};
