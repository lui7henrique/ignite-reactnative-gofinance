import { createContext, useContext, useState, useEffect } from "react";
import { oauth } from "../services/oauth";
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

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
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logOut: () => Promise<void>;
  userStorageLoading: boolean;
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
const key = "@gofinances:user";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      if (type === "success") {
        const { data } = await oauth.get("/userinfo", {
          params: {
            access_token: params.access_token,
          },
        });

        const userLogged = {
          id: data.id,
          name: data.name,
          email: data.email,
          photo: data.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(key, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const name = credentials.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userLogged = {
          id: String(credentials.user),
          name,
          email: credentials.email!,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(key, JSON.stringify(userLogged));
      }
    } catch (err) {
      throw new Error(err as string);
    }
  };

  const logOut = async () => {
    setUser(undefined);
    await AsyncStorage.removeItem("@gofinances:user");

    Toast.show({
      type: "success",
      text1: "Log-out feito com sucesso!",
    });
  };

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStorage = await AsyncStorage.getItem(key);
      console.log(userStorage);

      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }

      setUserStorageLoading(false);
    };

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        logOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
