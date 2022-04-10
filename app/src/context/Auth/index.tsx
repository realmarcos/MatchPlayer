import React, { createContext } from "react";
import useAuth from "../../hooks/useAuth";

interface AuthContextData {
  loading: boolean;
  user: object;
  isAuth: boolean;
  handleLogin(email, password): Promise<void>;
  handleLogout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line react/function-component-definition
const AuthProvider: React.FC = ({ children }) => {
  const {
    loading, user, isAuth, handleLogin, handleLogout,
  } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        loading, user, isAuth, handleLogin, handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
