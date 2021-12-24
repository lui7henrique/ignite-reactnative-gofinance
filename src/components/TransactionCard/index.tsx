import theme from "../../global/styles/theme";

import * as S from "./styles";

type Category = {
  name: string;
  icon: string;
};

type TransactionCardProps = {
  title: string;
  amount: string;
  date: string;
  category: Category;
};

export const TransactionCard = ({
  title,
  amount,
  date,
  category,
}: TransactionCardProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
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
