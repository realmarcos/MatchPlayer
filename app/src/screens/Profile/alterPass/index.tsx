import React, { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  IconButton, TextInput, useTheme,
} from "react-native-paper";
import { ButtonPrimary } from "../../../components/Buttons";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { AuthContext } from "../../../context/Auth";
import api from "../../../services/api";
import { styles } from "../../../theme/styles";

/** Screen AlterPassword */
function AlterPassword({ navigation }: any) {
  const { colors } = useTheme();
  const [viewPass, setViewPass] = useState(true);
  const [viewPassRepiter, setViewPassRepiter] = useState(true);
  const [viewPassCurrent, setViewPassCurrent] = useState(true);
  const { user } = useContext(AuthContext);

  const [passwords, setPasswords] = useState({
    passwordCurrent: "1234567",
    passwordRepiter: "1234567",
    password: "1234567",
  });
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (passwords.passwordCurrent === "" || passwords?.password === "" || passwords?.passwordRepiter === "") {
      showMessage({
        message: "Campos obrigatórios vazio!",
        type: "danger",
        description: "Por favor preencha os campos obrigatórios.",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (passwords?.password !== passwords?.passwordRepiter) {
      showMessage({
        message: "As senhas não são identicas!",
        description: "Por favor preencha corretamente a senha e repitir senha.",
        type: "danger",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (passwords.passwordCurrent === passwords?.password) {
      showMessage({
        message: "Você precisa colocar uma senha diferente da atual!",
        type: "danger",
        description: "Por favor preencha com uma seha diferente da atual.",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      await api.post(`/user/${user?.id}`, {
        password: passwords.password,
      });
      showMessage({
        message: "Informações salva com sucesso!",
        type: "success",
        statusBarHeight: 35,
      });
      navigation.goBack();
    } catch (err: any) {
      if (err.response?.data?.error === "password_already_exists") {
        showMessage({
          message: "Está é sua senha atual!",
          description: "Por favor informe uma senha diferente da atual.",
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
      handleSave();
    }
    setLoading(false);
  };

  return (
    <>
      <Header title="Editar Perfil">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Input
              label="Senha Atual*"
              secureTextEntry={viewPassCurrent}
              placeholder="Senha Atual*"
              // value={user?.password}
              onChangeText={(text: string) => setPasswords((value) => ({ ...value, passwordCurrent: text }))}
              right={<TextInput.Icon color={colors.primary} onPress={() => setViewPassCurrent(!viewPassCurrent)} name="eye" />}
            />
            <Input
              label="Senha*"
              secureTextEntry={viewPass}
              placeholder="Senha*"
              // value={user?.password}
              onChangeText={(text: string) => setPasswords((value) => ({ ...value, password: text }))}
              right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPass(!viewPass); }} name="eye" />}
            />
            <Input
              label="Repetir Senha*"
              secureTextEntry={viewPassRepiter}
              placeholder="Repetir Senha*"
              // value={passRepiter}
              onChangeText={(text: string) => setPasswords((value) => ({ ...value, passwordRepiter: text }))}
              right={<TextInput.Icon color={colors.primary} onPress={() => setViewPassRepiter(!viewPassRepiter)} name="eye" />}
            />
            <ButtonPrimary loading={loading} onPress={handleSubmit}>salvar</ButtonPrimary>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default AlterPassword;
