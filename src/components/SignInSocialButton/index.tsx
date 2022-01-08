import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import * as S from "./styles";

type SignInSocialButtonProps = {
  title: string;
  svg: React.FC<SvgProps>;
} & RectButtonProps;

export const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>
      <S.Title>{title}</S.Title>
    </S.Button>
  );
};
