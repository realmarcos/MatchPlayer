import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar, Card, Paragraph, Searchbar, useTheme, Text, Button,
} from "react-native-paper";
import Header from "../../components/Header";
import { ButtonPrimary, ButtonSecondary, ButtonCards } from "../../components/Buttons";
import { styles } from "../../theme/styles";
import ItensHeader from "../../components/ItensHeader";
import { AuthContext } from "../../context/Auth";

/** Screen Home or Matches */
function Home({ navigation }: any) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { colors } = useTheme();
  const onChangeSearch = (query: any) => setSearchQuery(query);
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header title="MathPlayer">
        <ItensHeader nav={navigation} />
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
            <ButtonPrimary onPress={() => navigation.navigate("addMatches")}>criar partida</ButtonPrimary>
            <ButtonSecondary onPress={() => navigation.navigate("MyMatches")}>Minhas partidas</ButtonSecondary>
          </View>
          <View>
            <Card style={styles.cards}>
              <Paragraph>
                Futebol
              </Paragraph>
              <Card.Title title="Pelada no parque das aguas" />
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                </View>
                <View>
                  <Text>Participantes: 3/10</Text>
                  <Text>19:00 até 20:00 </Text>
                  <Text>14 de Fevereico de 2022</Text>
                  <Text>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>participar</ButtonCards>
              </Card.Actions>
            </Card>
            <Card style={styles.cards}>
              <Paragraph>
                Futebol
              </Paragraph>
              <Card.Title title="Futebolzinho" />
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Button labelStyle={{ margin: 0, top: 0 }} uppercase={false} onPress={() => { navigation.navigate("inviteUsers"); }}>Convidar</Button>
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
            <Card style={{ borderRadius: 10, marginTop: 10 }}>
              <Paragraph style={{ color: "white" }}>
                {/* <Button icon="camera"> */}
                Futebol
                {/* </Button> */}
              </Paragraph>
              <Card.Title title="Pelada no parque das aguas" titleStyle={{ color: "white" }} />
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={32} source={require("../../assets/avatar.png")} />
                </View>
                <View>
                  <Text>Participantes: 3/10</Text>
                  <Text>19:00 até 20:00 </Text>
                  <Text>14 de Fevereico de 2022</Text>
                  <Text>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>participar</ButtonCards>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Home;
