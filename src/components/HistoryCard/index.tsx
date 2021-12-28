import * as S from "./styles";

type HistoryCardProps = {
  title: string;
  amount: string;
  color: string;
};

export const HistoryCard = ({ title, color, amount }: HistoryCardProps) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};
