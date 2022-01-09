import { format } from "date-fns";
import { TouchableOpacityProps } from "react-native";
import { Transaction } from "../../types/transaction";
import { categories } from "../../utils/categories";

import * as S from "./styles";

export type TransactionCardProps = Transaction & TouchableOpacityProps;

export const TransactionCard = ({
  type,
  title,
  amount,
  date,
  category: categoryKey,
  ...rest
}: TransactionCardProps) => {
  const category = categories.find((c) => c.key === categoryKey)!;

  return (
    <S.Container type={type} {...rest}>
      <S.Title>{title}</S.Title>
      <S.Amount>
        {type === "positive" ? "+ " : "- "}
        {amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.CategoryIcon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{format(new Date(date), "dd/MM/yyyy")}</S.Date>
      </S.Footer>
    </S.Container>
  );
};
