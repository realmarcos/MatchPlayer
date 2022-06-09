import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  btnPrimary: {
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 50,
  },
});

/** Button primary -  react-native-paper */
function ButtonPrimary({ ...rest }) {
  return (
    <Button
      {...rest}
      style={styles.btnPrimary}
      mode="contained"
      labelStyle={{ color: "#ffffff" }}
      contentStyle={{ padding: 5 }}
    />
  );
}

/** Button secondary -  react-native-paper */
function ButtonSecondary({ ...rest }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    btnSecondary: {
      width: "100%",
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 50,
    },
  });

  return (
    <Button
      {...rest}
      style={styles.btnSecondary}
      mode="outlined"
      contentStyle={{ padding: 5 }}
    />
  );
}
/** Button cards -  react-native-paper */
function ButtonCards({ ...rest }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    btnSecondary: {
      width: "100%",
      margin: 5,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 50,
    },
  });

  return (
    <Button
      {...rest}
      style={styles.btnSecondary}
      mode="outlined"
    />
  );
}

export { ButtonPrimary, ButtonSecondary, ButtonCards };
