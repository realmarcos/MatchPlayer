import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

function Input({ ...rest }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      margin: 5,
      marginBottom: 5,
      marginTop: 5,
    },
  });

  return (
    <TextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      style={styles.input}
      dense
      autoComplete="off"
      theme={{ roundness: 5, colors: { text: colors.surface } }}
    />
  );
}
export default Input;
