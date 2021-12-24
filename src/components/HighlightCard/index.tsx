import theme from "../../global/styles/theme";
import * as S from "./styles";

type HighlightCardProps = {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
};

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

const iconColor = {
  up: theme.colors.secondary,
  down: theme.colors.secondary,
  total: theme.colors.secondary,
};

export const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Icon name={icon[type]} size={30} color={iconColor[type]} />
      </S.Header>
      <S.Footer>
        <S.Amount>{amount}</S.Amount>
        <S.LastTransaction>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
};
