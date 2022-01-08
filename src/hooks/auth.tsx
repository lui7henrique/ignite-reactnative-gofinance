import { createContext, useContext, useState } from "react";
import { oauth } from "../services/oauth";
import * as AuthSession from "expo-auth-session";

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthContextData = {
  user: User;
  signInWithGoogle: () => Promise<void>;
};

type AuthResponse = {
  authentication: null;
  errorCode: null;
  params: {
    access_token: string;
    authuser: string;
    expires_in: string;
    prompt: string;
    scope: string;
    token_type: string;
  };
  type: string;
  url: string;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID =
        "163998651163-ml1qlmc12nin4h2po06ni3ouac5b77jm.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@lui7henrique/gofinance";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      console.log(params);

      if (type === "success") {
        const { data } = await oauth.get("/userinfo", {
          params: {
            access_token: params.access_token,
          },
        });

        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          photo: data.picture,
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
