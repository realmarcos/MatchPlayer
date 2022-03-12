import React from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { Avatar, Card, IconButton, Menu, Paragraph, Searchbar, TextInput, Title, useTheme } from "react-native-paper";
import { ButtonPrimary, ButtonSecondary } from "../../components/Buttons";
import { styles } from "../../theme/styles";
import ItensHeader from "../../components/ItensHeader";


/**Screen Home or Matches */
const Home = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { colors } = useTheme();

  const onChangeSearch = (query: any) => setSearchQuery(query);


  return (
    <>
      <Header title="MathPlayer">
        <ItensHeader nav={navigation} />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Searchbar
              autoComplete={false}
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery}
              theme={{ colors: { text: colors.placeholder } }}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: colors.placeholder,
                marginBottom: 10,
              }}
            />
            <ButtonPrimary onPress={() => navigation.navigate('addMatches')}>criar partida</ButtonPrimary>
            <ButtonSecondary onPress={() => navigation.navigate('addMatches')}>Minhas partidas</ButtonSecondary>
          </View>
          <View>

            <Card style={{ borderRadius: 10, marginTop: 10 }}>
              <Paragraph style={{ color: 'white' }}>
                {/* <Button icon="camera"> */}
                Futebol
                {/* </Button> */}
              </Paragraph>
              <Card.Title title="Pelada no parque das aguas" titleStyle={{ color: 'white' }} />
              <Card.Content >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                </View>
                <View>
                  <Text style={{ color: 'white' }}>Participantes: 3/10</Text>
                  <Text style={{ color: 'white' }}>19:00 até 20:00 </Text>
                  <Text style={{ color: 'white' }}>14 de Fevereico de 2022</Text>
                  <Text style={{ color: 'white' }}>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions>
                <ButtonSecondary>participar</ButtonSecondary>
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
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                  <Avatar.Image style={{ marginLeft: 2, marginRight: 2 }} size={20} source={require('../../assets/avatar.png')} />
                </View>
                <View>
                  <Text style={{ color: 'white' }}>Participantes: 3/10</Text>
                  <Text style={{ color: 'white' }}>19:00 até 20:00 </Text>
                  <Text style={{ color: 'white' }}>14 de Fevereico de 2022</Text>
                  <Text style={{ color: 'white' }}>Rua amâncio, Setor oeste</Text>

                </View>
              </Card.Content>
              <Card.Actions>
                <ButtonSecondary>participar</ButtonSecondary>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default Home;