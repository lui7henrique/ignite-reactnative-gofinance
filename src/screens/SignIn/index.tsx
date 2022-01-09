import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Platform } from "react-native";
import { useTheme } from "styled-components";
import Toast from "react-native-toast-message";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import LogoSvg from "../../assets/logo.svg";

import * as S from "./styles";
import { useState } from "react";

export const SignIn = () => {
  const { user, signInWithGoogle, signInWithApple } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao realizar login com Google",
      });
      setIsLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao realizar login com Apple",
      });
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <S.Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </S.Title>
        </S.TitleWrapper>
        <S.SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </S.FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
            style={{
              marginTop: RFValue(30),
            }}
          />
        )}
      </S.Footer>
    </S.Container>
  );
};
