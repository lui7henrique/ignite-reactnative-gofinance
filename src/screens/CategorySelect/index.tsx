import { Dispatch, useEffect } from "react";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";

import { Button } from "../../components/Form/Button";

import * as S from "./styles";

type Category = typeof categories[0];

type CategorySelectProps = {
  category: Category;
  setCategory: Dispatch<React.SetStateAction<Category>>;
  closeSelectCategory: () => void;
};

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => {
  const handleSelectCategory = (category: Category) => {
    setCategory(category);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleSelectCategory(item)}
            isActive={category.key === item.key}
          >
            <S.CategoryIcon name={item.icon} color={item.color} />
            <S.CategoryName>{item.name}</S.CategoryName>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />
      <S.Footer>
        <Button title="Salvar" onPress={() => closeSelectCategory()} />
      </S.Footer>
    </S.Container>
  );
};
