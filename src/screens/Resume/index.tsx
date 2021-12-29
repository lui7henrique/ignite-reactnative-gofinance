import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { ListRenderItem } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";

import { HistoryCard } from "../../components/HistoryCard";
import theme from "../../global/styles/theme";

import { Transaction } from "../../types/transaction";
import { categories } from "../../utils/categories";
import { formatToBRL } from "../../utils/formatBRL";

import * as S from "./styles";

type Category = {
  name: string;
  total: number;
  color: string;
  percent: string;
};

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives = responseFormatted.filter(
        (transaction: Transaction) => transaction.type === "negative"
      );

      const expensivesTotal = expensives.reduce(
        (acc: number, item: Transaction) => acc + item.amount,
        0
      );

      const totalByCategory: Array<Category> = [];

      categories.forEach((category) => {
        let categorySum = 0;

        expensives.forEach((transaction: Transaction) => {
          if (transaction.category === category.key) {
            categorySum += +transaction.amount;
          }
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          2
        )}%`;

        console.log(percent);

        if (categorySum > 0) {
          totalByCategory.push({
            name: category.name,
            total: categorySum,
            color: category.color,
            percent,
          });
        }
      });

      setTotalByCategories(totalByCategory);
    } catch (err) {}
  };

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <HistoryCard
      title={item.name}
      amount={formatToBRL(item.total)}
      color={item.color}
    />
  );

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo de gastos</S.Title>
      </S.Header>
      <S.SelectMonth>
        <S.SelectMonthButton>
          <S.SelectMonthButtonIcon name="chevron-left" />
        </S.SelectMonthButton>
        <S.Month>Text</S.Month>
        <S.SelectMonthButton>
          <S.SelectMonthButtonIcon name="chevron-right" />
        </S.SelectMonthButton>
      </S.SelectMonth>

      <S.ChartContainer>
        <VictoryPie
          data={totalByCategories}
          colorScale={totalByCategories.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(14),
              fill: "white",
              fontWeight: "bold",
            },
          }}
          labelRadius={70}
          y="total"
          x="percent"
        />
      </S.ChartContainer>
      <S.CategoriesList
        data={totalByCategories}
        renderItem={renderItem as ListRenderItem<unknown>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </S.Container>
  );
};
