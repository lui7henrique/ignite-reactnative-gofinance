import * as S from "./styles";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

export const Register = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.Form>
        <S.Fields>
          <Input placeholder="Título" />
          <Input placeholder="Preço" />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
};
