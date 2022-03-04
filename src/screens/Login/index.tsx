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
      <ButtonPrtimary onPress={() => navigation.navigate('Signup')}>Go to Register</ButtonPrtimary>
      <ButtonSecondary onPress={() => navigation.navigate('Signup')}>Go to Register</ButtonSecondary>
      <Input label="Email" placeholder="Email" />
    </View>
  );
}
export default Login;
