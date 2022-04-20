import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
import api from "../services/api";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      const userId = await SecureStore.getItemAsync("userId");
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        try {
          const { data } = await api.get(`/user/${userId}`);
          setUser(data);
          setIsAuth(true);
        } catch (error) {
          setUser({});
          setIsAuth(false);
        }
      }
    }
    loadSecureStore();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/sigin", {
        email,
        password,
      });
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      await SecureStore.setItemAsync("userId", JSON.stringify(data.user?.id));
      await SecureStore.setItemAsync("token", data.token);
      setUser(data.user);
      setIsAuth(true);
    } catch (err: any) {
      if (err.message === "timeout of 5000ms exceeded") {
        showMessage({
          message: "Erro de conexão com o servidor!",
          type: "danger",
          statusBarHeight: 35,
          description: "Verifique com o suporte do aplicativo.",
          duration: 1000 * 3,
        });
      } else {
        showMessage({
          message: "Usuário ou senha incorreto!",
          type: "danger",
          statusBarHeight: 35,
          duration: 1000 * 3,
        });
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      setIsAuth(false);
      setUser({});
      SecureStore.deleteItemAsync("token");
      api.defaults.headers.common.Authorization = "";
      setLoading(false);
      setUser({});
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    isAuth, user, loading, handleLogin, handleLogout, setUser,
  };
};

export default useAuth;
