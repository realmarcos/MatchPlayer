import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar, Card, Paragraph, Searchbar, useTheme, Text, ActivityIndicator, IconButton,
} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Header from "../../components/Header";
import { ButtonPrimary, ButtonSecondary, ButtonCards } from "../../components/Buttons";
import { styles } from "../../theme/styles";
import ItensHeader from "../../components/ItensHeader";
import { AuthContext } from "../../context/Auth";
import api from "../../services/api";

const avatar = require("../../assets/avatar.png");

/** Screen Home or Matches */
function Home({ navigation }: any) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const onChangeSearch = (query: any) => setSearch(query);
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMatch = async () => {
      try {
        const { data } = await api.get("/match", {
          params: { search },
        });
        setMatchs(data.matchs);
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar as Partidas!",
          statusBarHeight: 35,
          description: err.message,
        });
      }
    };
    fetchMatch();
    setLoading(false);
  }, [search, navigation]);

  const reloadMatch = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/match", {
        params: { search },
      });
      setMatchs(data.matchs);
    } catch (err: any) {
      showMessage({
        message: "Erro ao buscar as Partidas!",
        statusBarHeight: 35,
        description: err.message,
      });
    }
    setLoading(false);
  };

  const joinMatch = async (userId: any, matchId: number) => {
    try {
      await api.post("/guest", {
        userId,
        matchId,
      });
      reloadMatch();
    } catch (err: any) {
      console.log(err);
    }
  };

  const exitMatch = async (guestId: any) => {
    try {
      await api.delete(`/guest/${guestId}`);
      reloadMatch();
    } catch (err: any) {
      console.log(err);
    }
  };

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
              value={search}
              theme={{ colors: { text: colors.placeholder } }}
              style={styles.search}
            />
            <ButtonPrimary onPress={() => navigation.navigate("addMatches")}>criar partida</ButtonPrimary>
            <ButtonSecondary onPress={() => navigation.navigate("MyMatches")}>Minhas partidas</ButtonSecondary>
          </View>
          <View>
            {
              // eslint-disable-next-line no-nested-ternary
              loading
                ? <ActivityIndicator />
                : (matchs.length > 0)
                  ? (
                    matchs.map((match: any) => (
                      <Card style={styles.cards} key={match.id}>
                        <Paragraph key={match.sport.id}>
                          <IconButton style={{ paddingTop: 10 }} key={match.sport.id} size={16} icon="soccer" />
                          <Text>{match.sport.name}</Text>
                        </Paragraph>
                        <Card.Title title={match.name} />
                        <Card.Content>
                          <View style={styles.cardContentAvatar}>
                            <Avatar.Image
                              key={1010010}
                              style={{ marginLeft: 2, marginRight: 2 }}
                              size={32}
                              source={avatar}
                            />
                            {
                              match.guestsData.map((index: any) => (
                                <Avatar.Image
                                  key={index.id}
                                  style={{ marginLeft: 2, marginRight: 2 }}
                                  size={32}
                                  source={avatar}
                                />

                              ))
                            }
                          </View>
                          <View>
                            <Text>
                              Participantes:
                              {" "}
                              {match.guestsData.length + 1}
                              /
                              {match.limitUsers}
                            </Text>
                            <Text>
                              {match.startHour.substring(0, 5)}
                              {" "}
                              até
                              {" "}
                              {match.endHour.substring(0, 5)}
                              {" "}
                            </Text>
                            <Text>{format(new Date(match.day), "dd 'de' MMMM' de 'yyyy'", { locale: ptBR })}</Text>
                            <Text>
                              {`${match.local.street}, n° ${match.local.number}, ${match.local.district} - ${match.local.city}`}
                            </Text>

                          </View>
                        </Card.Content>
                        <Card.Actions style={styles.cardsActions}>
                          {
                            // eslint-disable-next-line no-nested-ternary
                            match.userIdCreated === user.id
                              ? (
                                <ButtonCards onPress={() => navigation.navigate("EditMatch", { matchId: match.id })}>
                                  editar
                                </ButtonCards>
                              )
                              : match.guestsData?.findIndex((guest: any) => guest.id === user.id) !== -1
                                ? (
                                  <ButtonCards onPress={() => {
                                    const guestId = match.guestsData.find(
                                      (guest: any) => (guest.id === user.id && guest.Guest.matchId === match.id),
                                    );
                                    exitMatch(guestId.Guest.id);
                                  }}
                                  >
                                    sair da partida
                                  </ButtonCards>
                                )
                                : (
                                  <ButtonCards onPress={() => joinMatch(user.id, match.id)}>
                                    participar
                                  </ButtonCards>
                                )
                          }

                        </Card.Actions>
                      </Card>
                    ))
                  )
                  : (
                    <Paragraph style={{ color: colors.surface, fontSize: 18 }}>
                      Sem resultados...
                    </Paragraph>
                  )
            }
            {/* <Card style={styles.cards}>
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
                <ButtonCards onPress={() => navigation.navigate("EditMatch", { matchId: 1 })}>participar</ButtonCards>
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
                Futebol
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
            </Card> */}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Home;
