import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import {
  Card, Paragraph, Searchbar, useTheme, Title, IconButton,
} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Header from "../../../components/Header";
import ItensHeader from "../../../components/ItensHeader";
import { styles } from "../../../theme/styles";
import { ButtonCards, ButtonPrimary, ButtonSecondary } from "../../../components/Buttons";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth";

/** Screen Locations */
function MyLocals({ navigation }: any) {
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
                          <Paragraph>
                            {local.sports.map((sport: any) => (
                              sport.name
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
                        <Card.Actions style={styles.cardsActions}>
                          <ButtonCards>criar partida</ButtonCards>
                        </Card.Actions>
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
