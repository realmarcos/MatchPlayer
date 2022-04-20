import React, { createContext } from "react";
import useAuth from "../../hooks/useAuth";

interface AuthContextData {
  loading: boolean;
  user: object;
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
    loading, user, isAuth, handleLogin, handleLogout, setUser,
  } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        loading, user, isAuth, handleLogin, handleLogout, setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
