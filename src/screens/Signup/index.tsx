import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Input from "../../components/Input";
import { ButtonPrimary } from "../../components/Buttons";
import { Button, Checkbox, TextInput, useTheme } from "react-native-paper";

const Login = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [viewPass, setViewPass] = React.useState(true);
  const [checkFut, setCheckFut] = React.useState(false);
  const [checkVol, setCheckVol] = React.useState(false);
  const [viewPassRepiter, setViewPassRepiter] = React.useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#3D1459",
      // alignItems: 'center',
      justifyContent: 'center',
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
    }
  })

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-main.png')}
        />
      </View>

      {/* Forms  */}
      <View>
        <Input label="Nome" placeholder="Nome" />
        <Input label="Email" placeholder="Email" />
        <Input
          label="Senha"
          secureTextEntry={viewPass}
          placeholder="Senha"
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPass(!viewPass) }} name="eye" />}
        />
        <Input
          label="Repetir Senha"
          secureTextEntry={viewPassRepiter}
          placeholder="Repetir Senha"
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPassRepiter(!viewPassRepiter) }} name="eye" />}
        />
      </View>

      <Text style={{ color: colors.primary, fontSize: 16 }} >Esporte Favorito</Text>
      <View style={styles.checkbox}>
        <Checkbox.Item
          status={checkFut ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckFut(!checkFut)
          }}
          color={colors.primary}
          labelStyle={{ color: colors.primary }}
          label="Futebol" />
        <Checkbox.Item
          status={checkVol ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckVol(!checkVol)
          }}
          color={colors.primary}
          labelStyle={{ color: colors.primary }}
          label="Vôlei" />
      </View>

      <ButtonPrimary onPress={() => navigation.navigate('Login')}>Cadastrar</ButtonPrimary>
      {/* <ButtonSecondary onPress={() => navigation.navigate('Login')}>Go to Login</ButtonSecondary> */}

      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5 }}>
        <Text
          style={{ color: colors.primary, fontSize: 16, paddingTop: 6 }} >
          Você já possui cadastro ?
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>Entrar</Button>

      </View>
    </View>
  );
}
export default Login;
