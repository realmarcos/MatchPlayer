import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar, Card, IconButton, Searchbar, Text, Title, useTheme,
} from "react-native-paper";
import { ButtonCards } from "../../components/Buttons";
import Header from "../../components/Header";
import { styles } from "../../theme/styles";

/** Screen Friends */
function Friends({ navigation }: any) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const stylesLocal = StyleSheet.create({
  });

  const listCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(
        <Card style={styles.cards} key={i}>
          <Card.Content>
            <View style={styles.cardContentAvatar}>
              <Avatar.Image size={64} source={require("../../assets/avatar.png")} />
              <View style={{ margin: 5, marginLeft: 10 }}>
                <Title>
                  João da Silva
                </Title>
                <Text>Esporte favorito: Futebol </Text>
              </View>
            </View>
          </Card.Content>

          <Card.Actions style={styles.cardsActions}>
            <ButtonCards>desfazer amizade</ButtonCards>
          </Card.Actions>
        </Card>,
      );
    }
    return cards;
  };

  return (
    <>
      <Header title="Amigos">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Searchbar
              autoComplete="off"
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery}
              theme={{ colors: { text: colors.placeholder } }}
              style={styles.search}
            />
          </View>
          {listCards()}
        </View>

      </ScrollView>
    </>
  );
}
export default Friends;
