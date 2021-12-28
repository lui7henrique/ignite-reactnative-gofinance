import { HistoryCard } from "../../components/HistoryCard";
import * as S from "./styles";

export const Resume = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <HistoryCard title="Compras" amount="50" color="#7159c1" />
    </S.Container>
  );
};
