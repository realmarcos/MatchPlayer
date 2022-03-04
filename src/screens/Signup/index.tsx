import React from "react";
import { StyleSheet, View } from "react-native";
import Input from "../../components/Input";
import ButtonPrtimary from "../../components/Buttons/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";

const Login = ({ navigation }: any) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#3D1459",
      // alignItems: 'center',
      justifyContent: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <ButtonPrtimary onPress={() => navigation.navigate('Login')}>Go to Login</ButtonPrtimary>
      <ButtonSecondary onPress={() => navigation.navigate('Login')}>Go to Login</ButtonSecondary>
      <Input label="Email" placeholder="Email" />
    </View>
  );
}
export default Login;
