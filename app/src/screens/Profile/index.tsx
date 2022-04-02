import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { ButtonPrimary, ButtonSecondary } from "../../components/Buttons";
import Header from "../../components/Header";
import { styles } from "../../theme/styles";

/**Screen Profile */
const Profile = ({ navigation }: any) => {
  const { colors } = useTheme();

  const stylesLocal = StyleSheet.create({
    avatarImg: {
      alignItems: "center",
      flex: 1,
      marginBottom: 20
    },
    btns: {
      marginTop: 20
    }
  });

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
          <Avatar.Image style={{ borderWidth: 1, borderColor: colors.primary }} size={256} source={require('../../assets/avatar.png')} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Nome: </Text>João da Silva
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Usuário: </Text>@joao.silva
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Email: </Text>joao@gmail.com
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Número: </Text>(99) 9999-9999
          </Text>
          <Text
            style={{ fontSize: 18 }}
            theme={{ colors: { text: colors.surface } }}
          >
            <Text style={{ fontWeight: "bold" }} theme={{ colors: { text: colors.surface } }}>Esportes: </Text>Futebol, Vôlei
          </Text>
        </View>
        <View style={stylesLocal.btns}>
          <ButtonSecondary onPress={() => navigation.navigate('Friends')}>Amigos</ButtonSecondary>
          <ButtonPrimary onPress={() => navigation.navigate('editProfile')}>editar perfil</ButtonPrimary>
          <ButtonPrimary onPress={() => { console.log("alterar senha") }}>alterar senha</ButtonPrimary>

        </View>

      </View>
    </>
  );
}
export default Profile;