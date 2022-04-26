import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Checkbox, IconButton, Paragraph, Text, useTheme,
} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Header from "../../../components/Header";
import { ButtonPrimary } from "../../../components/Buttons";
import Input from "../../../components/Input";
import { styles } from "../../../theme/styles";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth";

interface localData {
  name?: string;
  description?: string;
  street?: string;
  number?: string;
  district?: string;
  complement?: string;
}

/** Screen EditLocations or Matches */
function EditLocals({ navigation, route }: any) {
  const { localId } = route.params;
  const futebol = 1; // representando o id do esporte dentro do banco
  const volei = 2;
  const sports = [futebol];
  const { colors } = useTheme();
  const [checkFut, setCheckFut] = useState(true);
  const [checkVol, setCheckVol] = useState(false);
  const { user } = useContext(AuthContext);
  const [local, setLocal] = useState<localData | null>({
    name: "", description: "", street: "", number: "", district: "", complement: "",
  });

  useEffect(() => {
    async function getLocal() {
      try {
        const { data } = await api.get(`/local/${localId}`);
        setLocal(data);
        if (data.sports.find((sport: any) => sport.id === futebol)) {
          setCheckFut(true);
        }
        if (data.sports.find((sport: any) => sport.id === volei)) {
          setCheckVol(true);
        }
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar dados do local!",
          description: err.message,
          type: "danger",
          statusBarHeight: 35,
        });
      }
    }
    getLocal();
  }, []);

  const stylesLocal = StyleSheet.create({
    checkbox: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    adress: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "45%",
    },
  });

  const validateFields = () => {
    if (local?.name === "" || local?.street === "" || local?.number === "" || local?.district === "") {
      showMessage({
        message: "Campos obrigatórios!",
        type: "danger",
        description: "Por favor preencha os campos obrigatórios.",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    if (!checkFut && !checkVol) {
      showMessage({
        message: "Nenhum esporte escolhido!",
        description: "Por favor marque seu esporte favorito.",
        type: "danger",
        statusBarHeight: 35,
        duration: 1000 * 3,
      });
      return false;
    }
    return true;
  };
  const handleSports = () => {
    while (sports.length) {
      sports.pop();
    }
    if (checkFut && !checkVol) {
      sports.push(futebol);
    }
    if (checkVol && !checkFut) {
      sports.push(volei);
    }
    if (checkVol && checkFut) {
      sports.push(futebol);
      sports.push(volei);
    }
  };

  const handleSave = async () => {
    handleSports();
    try {
      await api.put(`/local/${localId}`, {
        name: local?.name,
        description: local?.description,
        street: local?.street,
        number: local?.number,
        district: local?.district,
        complement: local?.complement,
        sports,
        userIdCreated: user.id,
      });
      showMessage({
        message: "Local salvo com sucesso!",
        type: "success",
        statusBarHeight: 35,
      });
      navigation.goBack();
    } catch (err: any) {
      showMessage({
        message: "Erro ao tentar salvar local!",
        description: err.message,
        type: "danger",
        statusBarHeight: 35,
      });
    }
  };

  const handleSubmit = () => {
    // setLoading(true);
    const isValid = validateFields();
    if (isValid) {
      handleSave();
    }
    // setLoading(false);
  };

  return (
    <>
      <Header title="Editar local">
        <IconButton
          icon="keyboard-backspace"
          size={32}
          color={colors.primary}
          style={{ marginRight: -20 }}
          onPress={() => navigation.goBack()}
        />
      </Header>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Input
          label="Nome*"
          placeholder="Nome*"
          value={local?.name}
          onChangeText={(text: string) => setLocal((value) => ({ ...value, name: text }))}
        />
        <Input
          label="Descrição"
          placeholder="Descrição"
          multiline
          numberOfLines={3}
          value={local?.description}
          onChangeText={(text: string) => setLocal((value) => ({ ...value, description: text }))}
        />
        <Paragraph style={{ color: colors.surface, fontSize: 16, marginLeft: 3 }}>Endereço:</Paragraph>
        <Input
          label="Rua*"
          placeholder="Rua*"
          value={local?.street}
          onChangeText={(text: string) => setLocal((value) => ({ ...value, street: text }))}
        />
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
        >
          <View style={{ marginRight: 3, width: "49%" }}>
            <Input
              label="Número*"
              placeholder="Número*"
              value={local?.number}
              onChangeText={(text: string) => setLocal((value) => ({ ...value, number: text }))}
            />
          </View>
          <View style={{ marginLeft: 3, width: "49%" }}>
            <Input
              label="Bairro*"
              placeholder="Bairro*"
              value={local?.district}
              onChangeText={(text: string) => setLocal((value) => ({ ...value, district: text }))}
            />
          </View>
          <Input
            label="Complemento"
            placeholder="Complemento"
            value={local?.complement}
            onChangeText={(text: string) => setLocal((value) => ({ ...value, complement: text }))}
          />

        </View>
        <View style={{
          padding: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.primary,
        }}
        >
          <Text style={{ color: colors.surface, fontSize: 16 }}>Marque o esporte que é praticado neste local.</Text>
          <View style={stylesLocal.checkbox}>
            <Checkbox.Item
              uncheckedColor={colors.placeholder}
              status={checkFut ? "checked" : "unchecked"}
              onPress={() => {
                setCheckFut(!checkFut);
              }}
              color={colors.primary}
              labelStyle={{ color: colors.surface }}
              label="Futebol"
            />
            <Checkbox.Item
              uncheckedColor={colors.placeholder}
              status={checkVol ? "checked" : "unchecked"}
              onPress={() => {
                setCheckVol(!checkVol);
              }}
              color={colors.primary}
              labelStyle={{ color: colors.surface }}
              label="Vôlei"
            />
          </View>
        </View>

        <ButtonPrimary onPress={handleSubmit}>Salvar</ButtonPrimary>
      </View>
      {/* </ScrollView> */}
    </>
  );
}
export default EditLocals;
