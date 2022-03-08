import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**Screen Users or Athletes */
const Users = ({ navigation }: any) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: "#FFFFFF",
      // alignItems: 'center',  
      justifyContent: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <Text>Usuários</Text>
    </View>
  );
}
export default Users;