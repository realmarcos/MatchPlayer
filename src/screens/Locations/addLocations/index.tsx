import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../../components/Header";
import { Checkbox, IconButton, Text, TextInput, useTheme, } from "react-native-paper";
import { ButtonPrimary } from "../../../components/Buttons";
import Input from "../../../components/Input";
import { styles } from "../../../theme/styles";

/**Screen addLocations or Matches */
const AddLocations = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [checkFut, setCheckFut] = React.useState(false);
  const [checkVol, setCheckVol] = React.useState(false);

  const stylesLocal = StyleSheet.create({
    checkbox: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

  return (
    <>
      <Header title="Adicionar local">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Input label="Nome" placeholder="Nome" />
        <Input
          multiline
          numberOfLines={3}
          label="Endereço"
          placeholder="Endereço" />

        <View style={{ padding: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.primary }}>
          <Text style={{ color: colors.surface, fontSize: 16, }} >Escolha o esporte prcaticado no local</Text>
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

        <Input
          label="Funcionamento"
          value="Sempre aberto"
          right={<TextInput.Icon onPress={() => { console.log("first") }} color={colors.primary} name="pencil" />}
        />
        <Input
          label="Descrição"
          placeholder="Descrição"
          multiline
          numberOfLines={3}
        />
        <ButtonPrimary>Salvar</ButtonPrimary>
      </View>
      {/* </ScrollView> */}
    </>
  );
}
export default AddLocations;