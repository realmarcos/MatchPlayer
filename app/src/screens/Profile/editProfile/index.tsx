import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Checkbox, IconButton, Text, useTheme } from "react-native-paper";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { styles } from "../../../theme/styles";

/**Screen EditProfile */
const EditProfile = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [checkFut, setCheckFut] = React.useState(false);
  const [checkVol, setCheckVol] = React.useState(false);

  const stylesLocal = StyleSheet.create({
    avatarImg: {
      alignItems: "center",
      flex: 1,
      marginBottom: 20
    },
    btns: {
      marginTop: 20
    },
    checkbox: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

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
      <View style={styles.container}>
        <View style={stylesLocal.avatarImg}>
          <Avatar.Image style={{ borderWidth: 1, borderColor: colors.primary }} size={256} source={require('../../../assets/avatar.png')} />
          <Button>Alterar foto</Button>
        </View>
        <View style={{ flex: 1 }}>
          <Input label="Nome" placeholder="Nome" />
          <Input label="Usuário" placeholder="Usuário" />
          <Input label="Email" placeholder="Email" />
          <Input label="Telefone" placeholder="Telefone" />
          <View style={{ padding: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.primary }}>
            <Text style={{ color: colors.surface, fontSize: 16, }} >Seus esportes favoritos</Text>
            <View style={stylesLocal.checkbox}>
              <Checkbox.Item
                uncheckedColor={colors.placeholder}
                status={checkFut ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckFut(!checkFut)
                }}
                color={colors.placeholder}
                labelStyle={{ color: colors.surface }}
                label="Futebol" />
              <Checkbox.Item
                uncheckedColor={colors.placeholder}
                status={checkVol ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckVol(!checkVol)
                }}
                color={colors.placeholder}
                labelStyle={{ color: colors.surface }}
                label="Vôlei" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
export default EditProfile;