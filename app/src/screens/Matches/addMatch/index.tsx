import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet, View,
} from "react-native";
import {
  Checkbox,
  IconButton, Text, TextInput, useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Picker } from "@react-native-picker/picker";
import { showMessage } from "react-native-flash-message";
import { styles } from "../../../theme/styles";
import Input from "../../../components/Input";
import { ButtonPrimary } from "../../../components/Buttons";
import Header from "../../../components/Header";
import api from "../../../services/api";
import { AuthContext } from "../../../context/Auth";

interface matchData {
  name?: string;
  status?: string;
  note?: string;
  userIdCreated?: string | number | undefined;
  localId?: number;
  sportId?: number;
  limitUsers?: number | string;
  countUsers?: number | string;
  isPublic?: boolean;
  day?: Date;
  startHour?: Date | string;
  endHour?: Date | string;
}

/** Screen addMatches or Matches */
function AddMatch({ navigation }: any) {
  const stylesLocal = StyleSheet.create({
    checkbox: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
  const { colors } = useTheme();
  const futebol = 1; // representando o id do esporte dentro do banco
  const volei = 2;
  const [sport, setSport] = useState(futebol);
  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [checkFut, setCheckFut] = useState(true);
  const [checkVol, setCheckVol] = useState(false);
  const [locals, setLocals] = useState([]);
  const { user } = useContext(AuthContext);
  const [match, setMatch] = useState<matchData | null>({
    name: "",
    status: "pending",
    note: "",
    userIdCreated: user.id,
    sportId: sport,
    limitUsers: 10,
    countUsers: "",
    isPublic: true,
    day: new Date(),
    startHour: new Date(),
    endHour: new Date(),
  });

  useEffect(() => {
    async function fetchLocals() {
      try {
        const { data } = await api.get("/local", {
          params: {
            search: "",
          },
        });
        setLocals(data.locals);
      } catch (err: any) {
        showMessage({
          message: "Erro ao buscar locais!",
          type: "danger",
          statusBarHeight: 35,
          description: err.message,
        });
      }
    }
    fetchLocals();
  }, []);

  const onChangeDate = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
    setMatch((value) => ({ ...value, day: currentDate }));
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  const onChangeTimeStart = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
    setShowTimeStartPicker(false);
    setTimeStart(currentDate);
    setMatch((value) => ({ ...value, startHour: hour }));
  };

  const handleOpenTimeStartPicker = () => {
    setShowTimeStartPicker(true);
  };

  const onChangeTimeEnd = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    const hour = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
    setShowTimeEndPicker(false);
    setTimeEnd(currentDate);
    setMatch((value) => ({ ...value, endHour: hour }));
  };
  const handleOpenTimeEndPicker = () => {
    setShowTimeEndPicker(true);
  };

  const validateFields = () => {
    if (
      match?.name === ""
      || match?.limitUsers === ""
      || match?.day === null
      || match?.endHour === null
      || match?.startHour === null
    ) {
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

  const handleSave = async () => {
    try {
      await api.post("/match", {
        name: match?.name,
        status: "pending",
        note: match?.note,
        userIdCreated: match?.userIdCreated,
        localId: match?.localId,
        sportId: sport,
        limitUsers: match?.limitUsers,
        countUsers: "1",
        isPublic: match?.isPublic,
        day: match?.day,
        startHour: match?.startHour,
        endHour: match?.endHour,
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
    const isValid = validateFields();
    if (isValid) {
      handleSave();
    }
  };

  return (
    <>
      <Header title="Adicionar partida">
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
          <Input
            label="Nome*"
            placeholder="Nome*"
            value={match?.name}
            onChangeText={(text: string) => setMatch((value) => ({ ...value, name: text }))}
          />

          <View style={{
            padding: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.primary, margin: 5,
          }}
          >
            <Text style={{ color: colors.surface, fontSize: 16 }}>Marque o esporte para esta partida.</Text>
            <View style={stylesLocal.checkbox}>
              <Checkbox.Item
                uncheckedColor={colors.placeholder}
                status={checkFut ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckFut(!checkFut);
                  setCheckVol(false);
                  setSport(futebol);
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
                  setCheckFut(!!checkVol);
                  setSport(volei);
                }}
                color={colors.primary}
                labelStyle={{ color: colors.surface }}
                label="Vôlei"
              />
            </View>
          </View>
          <View style={{
            padding: 5, margin: 5,
          }}
          >
            <Text style={{ color: colors.surface, fontSize: 16 }}>Escolha o local.</Text>
            <Picker
              mode="dialog"
              enabled
              selectedValue={match?.localId}
              onValueChange={(text: number) => setMatch((value) => ({ ...value, localId: text }))}
            >
              {locals.map((local: any) => (
                <Picker.Item key={local.id} label={local.name} value={local.id} />

              ))}
            </Picker>
          </View>
          <Input
            label="Selecione a data"
            onChangeText={handleOpenDatePicker}
            value={format(date, "dd 'de' MMMM' de 'yyyy'", { locale: ptBR })}
            right={<TextInput.Icon onPress={handleOpenDatePicker} color={colors.primary} name="calendar" />}
          />
          {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            dateFormat="day month year"
            minimumDate={new Date()}
            onChange={(event: any, selectedDate: any) => onChangeDate(event, selectedDate || new Date())}
          />
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ width: "50%", padding: 5 }}>
              <Input
                label="Começa"
                value={format(timeStart, "HH:mm", { locale: ptBR })}
                right={<TextInput.Icon onPress={handleOpenTimeStartPicker} color={colors.primary} name="calendar" />}
              />
              {showTimeStartPicker && (
              <DateTimePicker
                testID="TimeStartPicker"
                value={timeStart}
                mode="time"
                is24Hour
                onChange={(event: any, selectedTime: any) => onChangeTimeStart(event, selectedTime || new Date())}
              />
              )}
            </View>
            <View style={{ width: "50%", padding: 5 }}>

              <Input
                label="Termina"
                value={format(timeEnd, "HH:mm", { locale: ptBR })}
                right={<TextInput.Icon onPress={handleOpenTimeEndPicker} color={colors.primary} name="calendar" />}
              />
              {showTimeEndPicker && (
              <DateTimePicker
                locale="pt-br"
                testID="TimeEndPicker"
                value={timeEnd}
                mode="time"
                is24Hour
                onChange={(event: any, selectedDate: any) => onChangeTimeEnd(event, selectedDate || new Date())}
              />
              )}
            </View>

          </View>
          <Input
            keyboardType="numeric"
            label="Número de participantes*"
            placeholder="Número de participantes*"
          // value={match?.limitUsers}
            onChangeText={(text: string) => setMatch((value) => ({ ...value, limitUsers: text }))}
          />

          <Input
            label="Observação"
            placeholder="Observação"
            multiline
            numberOfLines={3}
            onChangeText={(text: string) => setMatch((value) => ({ ...value, note: text }))}
          />
          <ButtonPrimary onPress={handleSubmit}>Salvar</ButtonPrimary>
        </View>
      </ScrollView>
    </>
  );
}
export default AddMatch;
