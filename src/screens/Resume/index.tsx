import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { ListRenderItem } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import { ActivityIndicator } from "react-native";
import pt from "date-fns/locale/pt";

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<Category[]>([]);

  const handleDateChange = (action: "next" | "previous") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    }

    if (action === "previous") {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";
    setIsLoading(true);

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives = responseFormatted.filter(
        (transaction: Transaction) =>
          transaction.type === "negative" &&
          new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            selectedDate.getFullYear()
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
      setIsLoading(false);
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
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo de gastos</S.Title>
      </S.Header>
      <S.SelectMonth>
        <S.SelectMonthButton onPress={() => handleDateChange("previous")}>
          <S.SelectMonthButtonIcon name="chevron-left" />
        </S.SelectMonthButton>
        <S.Month>
          {format(selectedDate, "MMMM', 'yyyy", {
            locale: pt,
          })}
        </S.Month>
        <S.SelectMonthButton onPress={() => handleDateChange("next")}>
          <S.SelectMonthButtonIcon name="chevron-right" />
        </S.SelectMonthButton>
      </S.SelectMonth>

      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          {totalByCategories.length > 0 ? (
            <>
              <S.ChartContainer>
                <VictoryPie
                  data={totalByCategories}
                  colorScale={totalByCategories.map(
                    (category) => category.color
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(12),
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
            </>
          ) : (
            <S.NoData>
              <S.NoDataText>Nenhum dado encontrado.</S.NoDataText>
            </S.NoData>
          )}
        </>
      )}
    </S.Container>
  );
};
