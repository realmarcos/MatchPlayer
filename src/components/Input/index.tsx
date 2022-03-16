import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, TextInput, useTheme } from 'react-native-paper';

const Input = ({ ...rest }) => {
  // const [text, setText] = React.useState("");
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      margin: 5,
      marginBottom: 5,
      marginTop: 5,
    }
  });

  return (
    <>
      <TextInput
        {...rest}
        style={styles.input}
        dense
        autoComplete={"off"}
        theme={{ roundness: 5, colors: {text: colors.surface} }}
        // value={text}
        // onChangeText={text => setText(text)} 
        />
    </>
  )
}
export default Input;