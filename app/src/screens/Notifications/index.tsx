import React from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar, Card, IconButton, Text, useTheme,
} from "react-native-paper";
import { ButtonCards, ButtonPrimary } from "../../components/Buttons";
import Header from "../../components/Header";
import MsgFunctionNotWork from "../../components/MsgFunctionNotWork";
import { styles } from "../../theme/styles";

/** Screen Notifications */
function Notifications({ navigation }: any) {
  const { colors } = useTheme();
  return (
    <>
      <Header title="Notificações">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <ButtonPrimary onPress={() => { MsgFunctionNotWork(); }}>marcar todas como lida</ButtonPrimary>
          <Card style={styles.cards}>
            <Card.Content>
              <Text>
                <Avatar.Icon size={14} icon="checkbox-marked-circle-outline" />
                {" "}
                Fulano te enviou um convite para partida tall
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardsActions2}>
              <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>aceitar</ButtonCards>
              <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>recusar</ButtonCards>
            </Card.Actions>
          </Card>
          <Card style={styles.cards}>
            <Card.Content>
              <Text>
                Fulano te enviou uma solicitação de amizade
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardsActions2}>
              <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>aceitar</ButtonCards>
              <ButtonCards onPress={() => { MsgFunctionNotWork(); }}>recusar</ButtonCards>
            </Card.Actions>
          </Card>
          <Card style={styles.cards}>
            <Card.Content>
              <Text>
                <Avatar.Icon size={14} icon="checkbox-marked-circle-outline" />
                {" "}
                Fulano te enviou uma solicitação de amizade
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardsActions}>
              <ButtonCards>você aceitou</ButtonCards>
            </Card.Actions>
          </Card>
          <Card style={styles.cards}>
            <Card.Content>
              <Text>
                <Avatar.Icon size={14} icon="checkbox-marked-circle-outline" />
                {" "}
                Fulano te enviou uma solicitação de amizade
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardsActions}>
              <ButtonCards>você recusou</ButtonCards>
            </Card.Actions>
          </Card>

        </View>
      </ScrollView>
    </>
  );
}
export default Notifications;
