/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from "react";
import useAuth from "../../hooks/useAuth";

interface userData {
  id?: string | number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  picture?: string;
}

interface sportData {
  id?: string | number;
  name?: string;
  userId?: string | number;
  sportId?: string | number;
}

interface AuthContextData {
  loading: boolean;
  user: userData;
  sports: sportData;
  isAuth: boolean;
  // eslint-disable-next-line no-unused-vars
  handleLogin(email: any, password: any): Promise<void>;
  handleLogout(): Promise<void>;
  setUser(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line react/function-component-definition
const AuthProvider: React.FC = ({ children }) => {
  const {
    loading, user, isAuth, handleLogin, handleLogout, setUser, sports,
  } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        loading, user, isAuth, handleLogin, handleLogout, setUser, sports,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
