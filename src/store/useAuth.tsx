"use client"
import React, { useContext, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { queryClient } from "./query";

export type AuthType = {
  user: any,
  jwt: string
};

const initialData: AuthType = {
  user: undefined,
  jwt: ""
};

type ProviderType = {
  loggedIn: boolean;
  data: AuthType;
  onLogin: (jwt:string) => void;
  onSaveUserData: any;
  onLogout: () => void;
  isLoading: boolean;
};

export const AuthContext = React.createContext<ProviderType>({
  loggedIn: true,
  data: {user: {}, jwt:""},
  onSaveUserData: () => {},
  onLogin: () => {},
  onLogout: () => {},
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useLocalStorageState("auth", {
    defaultValue: initialData,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const onSaveUserData = (user: any) => {
    setData((prevData) => ({ ...prevData, user }));
  };
  const onLogin = (newJwt: string) => {
    setData((prevData) => ({ ...prevData, jwt: newJwt }));
  };
  const onLogout = () => {
    setData((prevData) => ({ ...prevData, user: undefined }));
    // Clear all API cache. Makes sure we have correct data
    queryClient.clear();
  };
  const loggedIn = !!data.user && data.user !== "";
  return (
    <AuthContext.Provider
      value={{ loggedIn, data, onSaveUserData, onLogout, onLogin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};