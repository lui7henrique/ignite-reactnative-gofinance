import React from "react";
import { TouchableOpacityProps, View } from "react-native";
import { SvgProps } from "react-native-svg";
import * as S from "./styles";

type SignInSocialButtonProps = {
  title: string;
  svg: React.FC<SvgProps>;
} & TouchableOpacityProps;

export const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => {
  return (
    <S.Button {...rest} activeOpacity={0.8}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>
      <S.Title>{title}</S.Title>
    </S.Button>
  );
};
