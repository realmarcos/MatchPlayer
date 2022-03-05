import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Input from "../../components/Input";
import ButtonPrtimary from "../../components/Buttons/ButtonPrimary";
import { Button, TextInput, useTheme } from "react-native-paper";

const Login = ({ navigation }: any) => {
  const [viewPass, setViewPass] = React.useState(true);
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,

      padding: 25,
      backgroundColor: "#3D1459",
      // alignItems: 'center',
      justifyContent: 'center',
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
        <Input label="Email" placeholder="Email" />
        <Input
          label="Senha"
          secureTextEntry={viewPass}
          placeholder="Senha"
          right={<TextInput.Icon color={colors.primary} onPress={() => { setViewPass(!viewPass) }} name="eye" />}
        />
      </View>


      <ButtonPrtimary onPress={() => navigation.navigate('Login')}>Entrar</ButtonPrtimary>
      {/* <ButtonSecondary onPress={() => navigation.navigate('Login')}>Go to Login</ButtonSecondary> */}

      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5 }}>
        <Text
          style={{ color: colors.primary, fontSize: 16, paddingTop: 6 }} >
          Ainda não possui cadastro ?
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('Signup')}>Cadastrar</Button>

      </View>
    </View>
  );
}
export default Login;
