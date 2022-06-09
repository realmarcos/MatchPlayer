import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  Avatar, Card, IconButton, Paragraph, Searchbar, useTheme, Text,
} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ButtonCards, ButtonPrimary } from "../../../components/Buttons";
import Header from "../../../components/Header";
import ItensHeader from "../../../components/ItensHeader";
import { styles } from "../../../theme/styles";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth";

const avatar = require("../../../assets/avatar.png");

/** Screen My Matches */
function MyMatches({ navigation }: any) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const onChangeSearch = (query: any) => setSearch(query);
  const [loading, setLoading] = useState(false);
  const [matchs, setMatchs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // const unsubscribe = navigation.addListener("focus", () => {
    setLoading(true);
    const fetchMatchs = async () => {
      try {
        const { data } = await api.get("/match", {
          params: {
            search,
            userIdCreated: user.id,
          },
        });
        setMatchs(data.matchs);
        console.log(data);
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar suas partidas!",
          statusBarHeight: 35,
          description: err.message,
        });
      }
    };
    fetchMatchs();
    setLoading(false);
    // });
    // return unsubscribe;
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
              autoComplete="off"
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={search}
              theme={{ colors: { text: colors.placeholder } }}
              style={styles.search}
            />
            <ButtonPrimary onPress={() => navigation.navigate("addMatches")}>criar partida</ButtonPrimary>
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
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default MyMatches;
