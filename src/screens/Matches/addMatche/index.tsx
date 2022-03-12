import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../../components/Header";
import { Avatar, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { ButtonPrimary } from "../../../components/Buttons";
import Input from "../../../components/Input";


/**Screen addMatches or Matches */
const AddMatches = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: any) => setSearchQuery(query);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#FFFFFF",
      // alignItems: 'center',  
      justifyContent: 'center',
    },
    itensHeader: {
      position: "absolute",
      left: 0,
      // margin: 25,
      // flexDirection: "row",
      // flexWrap: "wrap",

    }
  })

  return (
    <>
      <Header title="Adicionar partida">
        {/* <View style={styles.itensHeader}> */}
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
        {/* </View> */}
      </Header>
      <View style={styles.container}>
        <Input label="Nome" placeholder="Nome" />
        <Input label="Observação" placeholder="Observação" />
        <ButtonPrimary onPress={console.log('press')}>Salvar</ButtonPrimary>
      </View>
    </>
  );
}
export default AddMatches;