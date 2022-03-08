import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**Screen Profile */
const Profile = ({ navigation }: any) => {
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
      <Text>Perfil</Text>
    </View>
  );
}
export default Profile;