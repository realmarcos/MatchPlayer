import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
const ButtonPrtimary = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      style={styles.btn}
      mode="contained"
      labelStyle={{ color: "#ffffff" }}
      contentStyle={{ padding: 5 }}
    >
    </Button>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    margin: 5,
  }
});
export default ButtonPrtimary