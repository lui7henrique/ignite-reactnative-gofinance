import * as S from "./styles";
import { TouchableOpacityProps } from "react-native";
import theme from "../../../global/styles/theme";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
