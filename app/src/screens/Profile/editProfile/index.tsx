import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TextInputMask } from "react-native-masked-text";
import {
  Avatar, Checkbox, IconButton, Text, useTheme,
} from "react-native-paper";
import { ButtonPrimary } from "../../../components/Buttons";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { AuthContext } from "../../../context/Auth";
import api from "../../../services/api";
import { styles } from "../../../theme/styles";

const avatar = require("../../../assets/avatar.png");

interface userState {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

const stylesLocal = StyleSheet.create({
  avatarImg: {
    alignItems: "center",
    flex: 1,
    marginBottom: 20,
  },
  btns: {
    marginTop: 20,
  },
  checkbox: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

/** Screen EditProfile */
function EditProfile({ navigation }: any) {
  const futebol = 1; // representando o id do esporte dentro do banco
  const volei = 2;
  const { colors } = useTheme();
  const [checkFut, setCheckFut] = useState(false);
  const [checkVol, setCheckVol] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState<userState | null>(null);
  const sports = [futebol];
  const [userValues, setUserValues] = useState<userState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get(`/user/ ${user.id}`);
        setUserValues(data);
        if (data.sports.find((sport: any) => sport.id === futebol)) {
          setCheckFut(true);
        }
        if (data.sports.find((sport: any) => sport.id === volei)) {
          setCheckVol(true);
        }
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar dados do usuário!",
          description: err.message,

        });
      }
    }
    loadUserData();
  }, []);

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

  const validateFields = () => {
    if (userData?.name === "" || userData?.email === "" || userData?.phone === "" || userData?.username === "") {
      showMessage({
        message: "Campos obrigatórios vazio!",
        type: "danger",
        description: "Por favor preencha os campos obrigatórios.",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (!checkFut && !checkVol) {
      showMessage({
        message: "Nehum esporte escolhido!",
        description: "Por favor marque seu esporte favorito.",
        type: "danger",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    handleSports();
    try {
      const { data } = await api.post(`/user/${user?.id}`, {
        name: userData?.name,
        username: userData?.username,
        email: userData?.email,
        phone: userData?.phone,
        sports,
      });
      setUser(data);
      showMessage({
        message: "Informações salva com sucesso!",
        type: "success",
        statusBarHeight: 35,
      });
      navigation.goBack();
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
      // showMessage({
      //   message: "Erro ao tentar salvar dados!",
      //   description: err.message,
      //   type: "danger",
      //   statusBarHeight: 35,
      // });
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
          <View style={stylesLocal.avatarImg}>
            <Avatar.Image
              style={{ backgroundColor: "#FFF" }}
              size={156}
              source={avatar}
            />
            {/* <Button>Alterar foto</Button> */}
          </View>
          <View>
            <Input
              value={userValues?.name}
              label="Nome"
              placeholder="Nome"
              onChangeText={(text: string) => setUserData((value) => ({ ...value, name: text }))}
            />
            <Input
              value={userValues?.username}
              label="Usuário"
              placeholder="Usuário"
              onChangeText={(text: string) => setUserData((value) => ({ ...value, username: text }))}
            />
            <Input
              value={userValues?.email}
              label="Email"
              placeholder="Email"
              onChangeText={(text: string) => setUserData((value) => ({ ...value, email: text }))}
            />
            <Input
              label="Telefone"
              placeholder="Telefone"
              value={userValues?.phone}
              render={(props: any) => (
                <TextInputMask
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                  // value={user?.phone}
                  type="cel-phone"
                  maxLength={15}
                  // ref={ref}
                  onChangeText={(text: string) => setUserData((value) => ({ ...value, phone: text }))}
                />
              )}
            />
            <View style={{
              padding: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.primary,
            }}
            >
              <Text style={{ color: colors.surface, fontSize: 16 }}>Seus esportes favoritos</Text>
              <View style={stylesLocal.checkbox}>
                <Checkbox.Item
                  uncheckedColor={colors.placeholder}
                  status={checkFut ? "checked" : "unchecked"}
                  onPress={() => {
                    setCheckFut(!checkFut);
                  }}
                  color={colors.placeholder}
                  labelStyle={{ color: colors.surface }}
                  label="Futebol"
                />
                <Checkbox.Item
                  uncheckedColor={colors.placeholder}
                  status={checkVol ? "checked" : "unchecked"}
                  onPress={() => {
                    setCheckVol(!checkVol);
                  }}
                  color={colors.placeholder}
                  labelStyle={{ color: colors.surface }}
                  label="Vôlei"
                />
              </View>
            </View>
            <ButtonPrimary loading={loading} onPress={handleSubmit}>salvar</ButtonPrimary>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default EditProfile;
