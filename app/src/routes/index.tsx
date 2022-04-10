import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import AppRoutes from "./appRoutes";
import AuthRoutes from "./authRoutes";

// eslint-disable-next-line react/function-component-definition
const Routes: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  // <AuthStack.Navigator>
  return isAuth ? <AppRoutes /> : <AuthRoutes />;
  // </AuthStack.Navigator>
};

export default Routes;
