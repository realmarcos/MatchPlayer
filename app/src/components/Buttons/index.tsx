import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  btnPrimary: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50
  }
});

/**Button primary -  react-native-paper*/
const ButtonPrimary = ({ ...rest }) => {
  return (
    <Button
      {...rest}
      style={styles.btnPrimary}
      mode="contained"
      labelStyle={{ color: "#ffffff" }}
      contentStyle={{ padding: 5 }}
    >
    </Button>
  )
}

/**Button secondary -  react-native-paper*/
const ButtonSecondary = ({ ...rest }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    btnSecondary: {
      width: "100%",
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 50
    }
  })

  return (
    <Button
      {...rest}
      style={styles.btnSecondary}
      mode="outlined"
      contentStyle={{ padding: 5 }}
    >
    </Button>
  )
}
/**Button cards -  react-native-paper*/
const ButtonCards = ({ ...rest }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    btnSecondary: {
      width: "100%",
      margin: 5,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 50
    }
  })

  return (
    <Button
      {...rest}
      style={styles.btnSecondary}
      mode="outlined"
    >
    </Button>
  )
}


export { ButtonPrimary, ButtonSecondary, ButtonCards }