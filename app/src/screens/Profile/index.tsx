import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  Avatar, IconButton, Text, useTheme,
} from "react-native-paper";
import { ButtonPrimary, ButtonSecondary } from "../../components/Buttons";
import Header from "../../components/Header";
import { AuthContext } from "../../context/Auth";
import api from "../../services/api";
import { styles } from "../../theme/styles";

const avatar = require("../../assets/avatar.png");

interface userState {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

/** Screen Profile */
function Profile({ navigation }: any) {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState<userState | null>(null);
  const [sports, setSports] = useState([{}]);

  const stylesLocal = StyleSheet.create({
    avatarImg: {
      alignItems: "center",
      flex: 1,
      marginBottom: 20,
    },
    btns: {
      marginTop: 20,
    },
  });

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get(`/user/ ${user.id}`);
        setUserData(data);
        setSports(data.sports);
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar dados do usuário!",
          description: err.message,
          type: "danger",

        });
      }
    }
    loadUserData();
  }, [user]);

  return (
    <>
      <Header title="Perfil">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <View style={styles.container}>
        <View style={stylesLocal.avatarImg}>
          <Avatar.Image
            style={{ backgroundColor: "#FFF" }}
            size={156}
            source={avatar}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Nome: </Text>
            {userData?.name}
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Usuário: </Text>
            {userData?.username}
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Email: </Text>
            {userData?.email}
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Número: </Text>
            {userData?.phone}
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Esportes: </Text>
            {sports.map((sport: any) => `${sport.name} `)}
          </Text>
        </View>
        <View style={stylesLocal.btns}>
          <ButtonSecondary onPress={() => navigation.navigate("Friends")}>Amigos</ButtonSecondary>
          <ButtonPrimary onPress={() => navigation.navigate("editProfile")}>editar perfil</ButtonPrimary>
          <ButtonPrimary onPress={() => navigation.navigate("alterPass")}>alterar senha</ButtonPrimary>

        </View>

      </View>
    </>
  );
}
export default Profile;
