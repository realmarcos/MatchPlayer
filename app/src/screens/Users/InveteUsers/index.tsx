import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Card, Searchbar, Title, useTheme, Text, IconButton } from "react-native-paper";
import { ButtonCards } from "../../../components/Buttons";
import Header from "../../../components/Header";
import ItensHeader from "../../../components/ItensHeader";
import { styles } from "../../../theme/styles";

/**Screen InviteUsers */
const InviteUsers = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <>
      <Header title="Convidar">
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
          </View>
          <View>
            <Card style={styles.cards}>
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image size={64} source={require('../../../assets/avatar.png')} />
                  <View style={{ margin: 5, marginLeft: 10 }}>
                    <Title>
                      João da Silva
                    </Title>
                    <Text>Esporte favorito: Futebol </Text>
                  </View>
                </View>
              </Card.Content>

              <Card.Actions style={styles.cardsActions}>
                <ButtonCards>convidar</ButtonCards>
              </Card.Actions>
            </Card>
            <Card style={styles.cards}>
              <Card.Content>
                <View style={styles.cardContentAvatar}>
                  <Avatar.Image size={64} source={require('../../../assets/avatar.png')} />
                  <View style={{ margin: 5, marginLeft: 10 }}>
                    <Title>
                      João da Silva
                    </Title>
                    <Text>Esporte favorito: Futebol </Text>
                  </View>
                </View>
              </Card.Content>

              <Card.Actions style={styles.cardsActions}>
                <ButtonCards icon="checkbox-marked-outline">convidado</ButtonCards>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default InviteUsers;