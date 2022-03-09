import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar, IconButton, useTheme } from "react-native-paper";

/**Screen Locations */
const Locations = ({ navigation }: any) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#FFFFFF",
      // alignItems: 'center',  
      justifyContent: 'center',
    },
    icone: {
      position: "absolute",
      right: 0,
      marginRight: 25,
      marginLeft: 5
    },
    itensHeader: {
      position: "absolute",
      right: 0,
      margin: 25,
      flexDirection: "row",
      flexWrap: "wrap",

    }
  })

  return (
    <>
      <Header title="MathPlayer">
        <View style={styles.itensHeader}>
          <IconButton
            icon="bell"
            size={32}
            color={colors.primary}
            onPress={() => console.log('Pressed')}
          />
          <Avatar.Image
            size={38}
            style={{ marginTop: 10 }}
            source={require('../../assets/avatar.png')}
          />
        </View>
      </Header>
      <View style={styles.container}>
        <Text>Locais</Text>
      </View>
    </>
  );
}
export default Locations;