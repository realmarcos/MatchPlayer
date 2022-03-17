import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../../components/Header";
import { Card, Paragraph, Searchbar, useTheme, Text } from "react-native-paper";
import ItensHeader from "../../components/ItensHeader";
import { styles } from "../../theme/styles";
import { ButtonCards, ButtonPrimary, ButtonSecondary } from "../../components/Buttons";

/**Screen Locations */
const Locations = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { colors } = useTheme();
  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <>
      <Header title="MathPlayer - Locais">
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
            <ButtonPrimary onPress={() => navigation.navigate('addLocations')}>adicionar local</ButtonPrimary>
            <ButtonSecondary onPress={() => navigation.navigate('MyMatches')}>meus locais</ButtonSecondary>
          </View>
          <View>
            <Card style={styles.cards}>
              <Paragraph>
                Futebol
              </Paragraph>
              <Card.Title title="Campo Parque das águas" />
              <Card.Content>
                <View>
                  <Text>Aberto de seg a dom das 12:00 até 23:00</Text>
                  <Text>Rua dos bois, Parque das Àguas </Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>criar partida</ButtonCards>
              </Card.Actions>
            </Card>
            <Card style={styles.cards}>
              <Paragraph>
                Futebol/Vôlei
              </Paragraph>
              <Card.Title title="Escola Amâncio" />
              <Card.Content>
                <View>
                  <Text>Aberto de seg a dom das 12:00 até 23:00</Text>
                  <Text>Rua amâncio, Setor oeste</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions2}>
                <ButtonCards>validar</ButtonCards>
                <ButtonCards>criar partida</ButtonCards>
              </Card.Actions>
            </Card>
            <Card style={styles.cards}>
              <Paragraph>
                Futebol
              </Paragraph>
              <Card.Title title="Campo do Centro" />
              <Card.Content >
                <View style={styles.cardContentAvatar}>
                  <Text theme={{ colors: { text: colors.primary } }}>Não validado</Text>
                </View>
                <View>
                  <Text>Aberto de seg a dom das 12:00 até 23:00</Text>
                  <Text>Rua amâncio, Setor oeste</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions2}>
                <ButtonCards>validar</ButtonCards>
                <ButtonCards>criar partida</ButtonCards>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Locations;