import * as S from "./styles";
import { Input } from "../../components/Form/Input";

export const Register = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.Form>
        <Input placeholder="Título"></Input>
        <Input placeholder="Preço"></Input>
      </S.Form>
    </S.Container>
  );
};
