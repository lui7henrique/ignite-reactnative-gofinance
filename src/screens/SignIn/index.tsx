import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import LogoSvg from "../../assets/logo.svg";

import * as S from "./styles";

export const SignIn = () => {
  const { user, signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao realizar login com Google",
      });
    }
  };

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao realizar login com Apple",
      });
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
      </S.Footer>
    </S.Container>
  );
};
