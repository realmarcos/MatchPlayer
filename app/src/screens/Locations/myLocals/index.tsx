import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator, ScrollView, Text, View,
} from "react-native";
import {
  Card, Paragraph, Searchbar, useTheme, Title, IconButton,
} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Header from "../../../components/Header";
import ItensHeader from "../../../components/ItensHeader";
import { styles } from "../../../theme/styles";
import { ButtonCards, ButtonPrimary } from "../../../components/Buttons";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth";

/** Screen Locations */
function MyLocals({ navigation }: any) {
  const futebol = 1; // representando o id do esporte dentro do banco
  const volei = 2;
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const onChangeSearch = (query: any) => setSearch(query);
  const [locals, setLocals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      const fetchLocals = async () => {
        try {
          const { data } = await api.get("/local", {
            params: {
              search,
              userIdCreated: user.id,
            },
          });
          setLocals(data.locals);
        } catch (err: any) {
          showMessage({
            message: "Erro ao buscar os locais!",
            statusBarHeight: 35,
            description: err.message,
          });
        }
      };
      fetchLocals();
      setLoading(false);
    });
    return unsubscribe;
  }, [search, navigation]);

  return (
    <>
      <Header title="MathPlayer - Meus Locais">
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
            <ButtonPrimary onPress={() => navigation.navigate("addLocations")}>adicionar novo local</ButtonPrimary>
          </View>
          <View>
            {
              // eslint-disable-next-line no-nested-ternary
              loading
                ? <ActivityIndicator />
                : (locals.length > 0)
                  ? (
                    // eslint-disable-next-line array-callback-return
                    locals.map((local: any) => (
                      <Card style={styles.cards} key={local.id}>
                        <Card.Content>
                          <Title>{local.name}</Title>
                          <Paragraph style={{
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                          }}
                          >
                            {local.sports.map((sport: any) => (
                              (sport.id === futebol)
                                ? (
                                  <Paragraph key={futebol}>
                                    <IconButton style={{ paddingTop: 10 }} key={futebol} size={20} icon="soccer" />
                                    <Text>Futebol</Text>
                                  </Paragraph>
                                )
                                : ""
                            ))}
                            {local.sports.map((sport: any) => (
                              (sport.id === volei)
                                ? (
                                  <Paragraph key={volei}>
                                    <IconButton style={{ paddingTop: 10 }} key={volei} size={20} icon="volleyball" />
                                    Vôlei
                                  </Paragraph>
                                )
                                : ""
                            ))}
                          </Paragraph>
                          <View>
                            <Paragraph>
                              {`${local.street}, n° ${local.number}, ${local.district} - ${local.city}`}
                            </Paragraph>
                            <Paragraph>
                              {local.description}
                            </Paragraph>
                          </View>
                        </Card.Content>
                        {
                          (local.userIdCreated === user.id)
                            ? (
                              <Card.Actions style={styles.cardsActions2}>
                                <ButtonCards
                                  onPress={() => navigation.navigate("Editlocals", { localId: local.id })}
                                >
                                  editar
                                </ButtonCards>
                                <ButtonCards>criar partida</ButtonCards>
                              </Card.Actions>
                            )
                            : (
                              <Card.Actions style={styles.cardsActions}>
                                <ButtonCards>criar partida</ButtonCards>
                              </Card.Actions>
                            )
                        }
                      </Card>
                    )))
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
export default MyLocals;
