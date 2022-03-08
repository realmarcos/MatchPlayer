import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**Screen Home or Matches */
const Home = ({ navigation }: any) => {
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
      <Text>Home</Text>
    </View>
  );
}
export default Home;