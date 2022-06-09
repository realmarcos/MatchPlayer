import React from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar, Card, IconButton, Searchbar, Text, Title, useTheme,
} from "react-native-paper";
import { ButtonCards } from "../../components/Buttons";
import Header from "../../components/Header";
import MsgFunctionNotWork from "../../components/MsgFunctionNotWork";
import { styles } from "../../theme/styles";

/** Screen Friends */
function Friends({ navigation }: any) {
  const { colors } = useTheme();

  const listCards = () => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
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
                <Text>
                  Telefone: (63)9999-999
                  {i}
                  {" "}
                </Text>
              </View>
            </View>
          </Card.Content>

          <Card.Actions style={styles.cardsActions}>
            <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>desfazer amizade</ButtonCards>
          </Card.Actions>
        </Card>,
      );
    }
    for (let i = 0; i < 5; i++) {
      cards.push(
        <Card style={styles.cards} key={`_${i}`}>
          <Card.Content>
            <View style={styles.cardContentAvatar}>
              <Avatar.Image size={64} source={require("../../assets/avatar.png")} />
              <View style={{ margin: 5, marginLeft: 10 }}>
                <Title>
                  Maria
                </Title>
                <Text>Esporte favorito: Vôlei </Text>
                <Text>
                  Telefone: (63)9899-999
                  {i}
                  {" "}
                </Text>
              </View>
            </View>
          </Card.Content>

          <Card.Actions style={styles.cardsActions}>
            <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>desfazer amizade</ButtonCards>
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
              onChangeText={() => { MsgFunctionNotWork(); }}
              // value={searchQuery}
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
