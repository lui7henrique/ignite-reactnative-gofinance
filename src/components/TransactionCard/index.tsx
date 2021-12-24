import theme from "../../global/styles/theme";

import * as S from "./styles";

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardProps = {
  type: "positive" | "negative";
  title: string;
  amount: string;
  date: string;
  category: Category;
};

export const TransactionCard = ({
  type,
  title,
  amount,
  date,
  category,
}: TransactionCardProps) => {
  return (
    <S.Container type={type}>
      <S.Title>{title}</S.Title>
      <S.Amount>
        {type === "negative" ? "- " : "+ "}
        {amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.CategoryIcon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
};
