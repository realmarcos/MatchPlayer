import React, { useContext, useState } from "react";
import {
  Image, StyleSheet, Text, View,
} from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Input from "../../components/Input";
import { ButtonPrimary } from "../../components/Buttons";
import logoMain from "../../assets/logo-main.png";
// import api from "../../services/api";
import { AuthContext } from "../../context/Auth";

function Login({ navigation }: any) {
  const [viewPass, setViewPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const { handleLogin } = useContext(AuthContext);

  const validateFields = () => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false && (email !== "" || password !== "")) {
      showMessage({
        message: "Email inválido!",
        type: "danger",
        description: "Por favor verifique seu email.",
        statusBarHeight: 35,
      });
      return false;
    }
    if (email === "" || password === "") {
      showMessage({
        message: "Campos obrigatórios!",
        type: "danger",
        description: "Por favor preencha os campos obrigatórios.",
        statusBarHeight: 35,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isValid = validateFields();
    if (isValid) {
      handleLogin(email, password);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#3D1459",
      // alignItems: 'center',
      justifyContent: "center",
    },
    logo: {
      marginBottom: 80,
      width: 128,
      height: 128,
    },
  });

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={logoMain}
        />
      </View>
      <View>
        <Input label="Email*" value={email} onChangeText={(value: string) => setEmail(value)} placeholder="Email*" />
        <Input
          label="Senha*"
          secureTextEntry={viewPass}
          value={password}
          placeholder="Senha*"
          onChangeText={(value: string) => setPassword(value)}
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPass(!viewPass); }} name="eye" />}
        />
      </View>

      <ButtonPrimary onPress={handleSubmit}>Entrar</ButtonPrimary>

      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5 }}>
        <Text
          style={{ color: colors.primary, fontSize: 16, paddingTop: 6 }}
        >
          Ainda não possui cadastro ?
        </Text>
        <Button mode="text" onPress={() => navigation.navigate("Signup")}>Cadastrar</Button>

      </View>
    </View>
  );
}
export default Login;
