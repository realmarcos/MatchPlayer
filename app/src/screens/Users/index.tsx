import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Card, Searchbar, Text, Title, useTheme } from "react-native-paper";
import { ButtonCards } from "../../components/Buttons";
import Header from "../../components/Header";
import ItensHeader from "../../components/ItensHeader";
import { styles } from "../../theme/styles";

/**Screen Users or Athletes */
const Users = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  const listCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(
        <Card style={styles.cards} key={i}>
          <Card.Content>
            <View style={styles.cardContentAvatar}>
              <Avatar.Image size={64} source={require('../../assets/avatar.png')} />
              <View style={{ margin: 5, marginLeft: 10 }}>
                <Title>
                  João da Silva
                </Title>
                <Text>Esporte favorito: Futebol </Text>
              </View>
            </View>
          </Card.Content>

          <Card.Actions style={styles.cardsActions}>
            <ButtonCards>adicionar amigo</ButtonCards>
          </Card.Actions>
        </Card>
      )
    }
    return cards;
  };

  return (
    <>
      <Header title="MathPlayer - Atletas">
        <ItensHeader nav={navigation} />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Searchbar
              autoComplete={"off"}
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery}
              theme={{ colors: { text: colors.placeholder } }}
              style={styles.search}
            />
          </View>
          <View>
            <Card style={styles.cards}>
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image size={64} source={require('../../assets/avatar.png')} />
                  <View style={{ margin: 5, marginLeft: 10 }}>
                    <Title>
                      João da Silva
                    </Title>
                    <Text>Esporte favorito: Futebol </Text>
                  </View>
                </View>
              </Card.Content>

              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>adicionar amigo</ButtonCards>
              </Card.Actions>
            </Card>
            {listCards()}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Users;