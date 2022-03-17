import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#FFFFFF",
    // alignItems: 'center',  
    justifyContent: 'center',
  },
  search: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#707070',
    marginBottom: 10,
  },
  cards: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  cardContentAvatar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardsActions: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  cardsActions2: {
    width: '50%',
    padding: 10,
    // paddingRight: 20,
  },
  btn: {
    padding: 0,
    margin: 50
  }
});

export { styles };