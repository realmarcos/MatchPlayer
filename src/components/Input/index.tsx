import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const ButtonPrtimary = ({ ...rest }) => {
  const [text, setText] = React.useState("");

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      margin: 5,
    }
  });

  return (
    <>
      <TextInput
        {...rest}
        style={styles.input}
        autoComplete={false}
        theme={{ roundness: 10 }}
        value={text}
        onChangeText={text => setText(text)} />
    </>
  )
}

export default ButtonPrtimary