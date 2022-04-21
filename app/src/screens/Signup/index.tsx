import React, { useContext, useState } from "react";
import {
  StyleSheet, View, Text, Image,
} from "react-native";
import {
  Button, Checkbox, TextInput, useTheme,
} from "react-native-paper";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { TextInputMask } from "react-native-masked-text";
import Input from "../../components/Input";
import { ButtonPrimary } from "../../components/Buttons";
import logoMain from "../../assets/logo-main.png";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth";

interface userState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

function Login({ navigation }: any) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#3D1459",
      // alignItems: 'center',
      justifyContent: "center",
    },
    checkbox: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    logo: {
      marginBottom: 80,
      width: 128,
      height: 128,
    },
  });

  const futebol = 1;
  const volei = 2;

  const { colors } = useTheme();
  const [viewPass, setViewPass] = useState(true);
  const [checkFut, setCheckFut] = useState(true);
  const [checkVol, setCheckVol] = useState(false);
  const sports = [futebol];
  const [viewPassRepiter, setViewPassRepiter] = useState(true);
  const [passRepiter, setPassRepiter] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const [user, setUser] = useState<userState | null>({
    name: "", email: "", phone: "", password: "",
  });

  const validateFields = () => {
    if (user?.name === "" || user?.email === "" || user?.phone === "" || user?.password === "") {
      showMessage({
        message: "Campos obrigatórios!",
        type: "danger",
        description: "Por favor preencha os campos obrigatórios.",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (user?.password !== passRepiter) {
      showMessage({
        message: "As senhas não são identicas!",
        description: "Por favor preencha corretamente.",
        type: "danger",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (!checkFut && !checkVol) {
      showMessage({
        message: "Nenhum esporte escolhido!",
        description: "Por favor marque seu esporte favorito.",
        type: "danger",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    return true;
  };

  const handleSports = () => {
    while (sports.length) {
      sports.pop();
    }
    if (checkFut && !checkVol) {
      sports.push(futebol);
    }
    if (checkVol && !checkFut) {
      sports.push(volei);
    }
    if (checkVol && checkFut) {
      sports.push(futebol);
      sports.push(volei);
    }
  };
  // handleSports();

  const handleSignup = async () => {
    handleSports();
    try {
      await api.post("/signup", {
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        password: user?.password,
        sports,
      });
      handleLogin(user?.email, user?.password);
    } catch (err: any) {
      if (err.response?.data?.error === "email_already_exists") {
        showMessage({
          message: "Email já existe em outra conta!",
          type: "danger",
          statusBarHeight: 35,
          duration: 3 * 1000,
        });
      }
      if (err.response?.data?.error === "phone_already_exists") {
        showMessage({
          message: "Número de telefone já existe em outra conta!",
          type: "danger",
          statusBarHeight: 35,
          duration: 3 * 1000,
        });
      }
      if (err.response?.data?.error === "username_already_exists") {
        showMessage({
          message: "Nome de usuário já existe em outra conta!",
          type: "danger",
          statusBarHeight: 35,
          duration: 3 * 1000,
        });
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const isValid = validateFields();
    if (isValid) {
      handleSignup();
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={logoMain}
        />
      </View>

      {/* Forms  */}
      <View>
        <Input
          onChangeText={(text: string) => setUser((value) => ({ ...value, name: text }))}
          label="Nome*"
          placeholder="Nome*"
        />
        <Input
          onChangeText={(text: string) => setUser((value) => ({ ...value, email: text }))}
          label="Email*"
          placeholder="Email*"
        />
        <Input
          label="Telefone*"
          placeholder="Telefone*"
          value={user?.phone}
          render={(props: any) => (
            <TextInputMask
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              // value={user?.phone}
              type="cel-phone"
              maxLength={15}
              // ref={ref}
              onChangeText={(text: string) => setUser((value) => ({ ...value, phone: text }))}
            />
          )}
        />
        <Input
          label="Senha*"
          secureTextEntry={viewPass}
          placeholder="Senha*"
          // value={user?.password}
          onChangeText={(text: string) => setUser((value) => ({ ...value, password: text }))}
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPass(!viewPass); }} name="eye" />}
        />
        <Input
          label="Repetir Senha*"
          secureTextEntry={viewPassRepiter}
          placeholder="Repetir Senha*"
          // value={passRepiter}
          onChangeText={(text: string) => setPassRepiter(text)}
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPassRepiter(!viewPassRepiter); }} name="eye" />}
        />
      </View>

      <Text style={{ color: colors.primary, fontSize: 16 }}>Esporte Favorito</Text>
      <View style={styles.checkbox}>
        <Checkbox.Item
          status={checkFut ? "checked" : "unchecked"}
          onPress={() => {
            setCheckFut(!checkFut);
          }}
          color={colors.primary}
          labelStyle={{ color: colors.primary }}
          label="Futebol"
        />
        <Checkbox.Item
          status={checkVol ? "checked" : "unchecked"}
          onPress={() => {
            setCheckVol(!checkVol);
          }}
          color={colors.primary}
          labelStyle={{ color: colors.primary }}
          label="Vôlei"
        />
      </View>

      <ButtonPrimary loading={loading} onPress={handleSubmit}>Cadastrar</ButtonPrimary>
      {/* <ButtonSecondary onPress={() => navigation.navigate('Login')}>Go to Login</ButtonSecondary> */}

      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5 }}>
        <Text
          style={{ color: colors.primary, fontSize: 16, paddingTop: 6 }}
        >
          Você já possui cadastro ?
        </Text>
        <Button mode="text" onPress={() => navigation.navigate("Login")}>Entrar</Button>

      </View>
    </View>
  );
}
export default Login;
