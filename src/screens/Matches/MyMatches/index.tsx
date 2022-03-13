import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, IconButton, Paragraph, Searchbar, useTheme, Text } from "react-native-paper";
import { ButtonCards, ButtonPrimary, ButtonSecondary } from "../../../components/Buttons";
import Header from "../../../components/Header";
import ItensHeader from "../../../components/ItensHeader";
import { styles } from "../../../theme/styles";

/**Screen My Matches */
const MyMatches = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { colors } = useTheme();
  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <>
      <Header title="Minhas partidas">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
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
            <ButtonPrimary onPress={() => navigation.navigate('addMatches')}>criar partida</ButtonPrimary>
          </View>
          <View>

            <Card style={styles.cards}>
              <Paragraph>
                Futebol
              </Paragraph>
              <Card.Title title="Pelada no parque das aguas" />
              <Card.Content >
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                </View>
                <View>
                  <Text>Participantes: 3/10</Text>
                  <Text>19:00 até 20:00 </Text>
                  <Text>14 de Fevereico de 2022</Text>
                  <Text>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>aguardando confirmação</ButtonCards>
              </Card.Actions>
            </Card>
            <Card style={{ borderRadius: 10, marginTop: 10 }}>
              <Paragraph style={{ color: 'white' }}>
                {/* <Button icon="camera"> */}
                Futebol
                {/* </Button> */}
              </Paragraph>
              <Card.Title title="Pelada no parque das aguas" titleStyle={{ color: 'white' }} />
              <Card.Content >
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../../assets/avatar.png')} />
                </View>
                <View>
                  <Text>Participantes: 3/10</Text>
                  <Text>19:00 até 20:00 </Text>
                  <Text>14 de Fevereico de 2022</Text>
                  <Text>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions2}>
                <ButtonCards>editar</ButtonCards>
                <ButtonCards>cancelar</ButtonCards>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default MyMatches;