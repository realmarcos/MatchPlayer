import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**Screen Locations */
const Locations = ({ navigation }: any) => {
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
      <Text>Locais</Text>
    </View>
  );
}
export default Locations;