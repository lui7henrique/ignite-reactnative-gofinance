import * as S from "./styles";
import { TextInputProps } from "react-native";
import theme from "../../../global/styles/theme";

type InputProps = TextInputProps;

export const Input = ({ ...rest }: InputProps) => {
  return (
    <S.Container
      {...rest}
      placeholderTextColor={theme.colors.support}
    ></S.Container>
  );
};
