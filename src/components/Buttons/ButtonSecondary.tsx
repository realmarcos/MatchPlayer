import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
const ButtonPrtimary = ({ ...rest }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    btn: {
      width: "100%",
      margin: 5,
      borderWidth: 1,
      borderColor: colors.primary
    }
  });
  return (
    <Button
      {...rest}
      style={styles.btn}
      mode="outlined"
      contentStyle={{ padding: 5 }}
    >
    </Button>
  )
}
export default ButtonPrtimary