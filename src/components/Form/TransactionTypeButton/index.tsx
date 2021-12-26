import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type TransactionTypeButtonProps = {
  title: string;
  type: "positive" | "negative";
  isActive?: boolean;
} & TouchableOpacityProps;

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) => {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon name={icons[type]} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
