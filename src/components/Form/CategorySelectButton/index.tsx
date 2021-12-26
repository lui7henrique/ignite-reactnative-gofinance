import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type CategorySelectProps = {
  title: string;
} & TouchableOpacityProps;

export const CategorySelectButton = ({
  title,
  ...rest
}: CategorySelectProps) => {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};
