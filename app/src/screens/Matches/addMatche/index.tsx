import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import Header from "../../../components/Header";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { ButtonPrimary } from "../../../components/Buttons";
import Input from "../../../components/Input";
import { styles } from "../../../theme/styles";
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**Screen addMatches or Matches */
const AddMatches = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sport, setSport] = React.useState('football');
  const [date, setDate] = React.useState(new Date());
  const [timeStart, setTimeStart] = React.useState(new Date());
  const [timeEnd, setTimeEnd] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = React.useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = React.useState(false);

  const onChangeDate = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  const onChangeTimeStart = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowTimeStartPicker(false);
    setTimeStart(currentDate);
  };

  const handleOpenTimeStartPicker = () => {
    setShowTimeStartPicker(true);
  };

  const onChangeTimeEnd = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowTimeEndPicker(false);
    setTimeEnd(currentDate);
  };

  const handleOpenTimeEndPicker = () => {
    setShowTimeEndPicker(true);
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 0.5,
      borderColor: colors.primary,
      borderRadius: 10,
      color: 'black',
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  const sports = [
    {
      label: 'Futebol',
      value: 'futebol',
    },
    {
      label: 'Volei',
      value: 'volei',
    },
  ];

  const locales = [
    {
      label: 'Local 1',
      value: 'local1',
    },
    {
      label: 'local 2',
      value: 'local2',
    },
    {
      label: 'local 3',
      value: 'local3',
    },
  ];

  const onChangeSearch = (query: any) => setSearchQuery(query);

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
      {/* <ScrollView
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }> */}

      <View style={styles.container}>
        <Input label="Nome" placeholder="Nome" />
        <RNPickerSelect
          placeholder={{
            label: 'Selecione o local...',
            value: 'local',
            color: '#9EA0A4',
          }}
          items={locales}
          onValueChange={(value: any) => {
            setSport(value)
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={sport}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color={colors.placeholder} />;
          }}
        />
        <RNPickerSelect
          placeholder={{
            label: 'Selecione o esporte...',
            value: 'sport',
            color: '#9EA0A4',
          }}
          items={sports}
          onValueChange={(value: any) => {
            setSport(value)
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={sport}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color={colors.placeholder} />;
          }}
        />

          
        <Input
          label="Selecione a data"
          onChangeText={handleOpenDatePicker}
          value={format(date, "dd 'de' MMMM' de 'yyyy'", { locale: ptBR })}
          right={<TextInput.Icon onPress={handleOpenDatePicker} color={colors.primary} name="calendar" />}
        />
        {showDatePicker && (
          <DateTimePicker
            locale="pt-br"
            testID="dateTimePicker"
            value={date}
            minimumDate={new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(event: any, selectedDate: any) => onChangeDate(event, selectedDate)}
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
                mode={'time'}
                is24Hour={true}
                onChange={(event: any, selectedTime: any) => onChangeTimeStart(event, selectedTime)}
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
                mode={'time'}
                is24Hour={true}
                onChange={(event: any, selectedDate: any) => onChangeTimeEnd(event, selectedDate)}
              />
            )}
          </View>

        </View>


        <Input
          label="Observação"
          placeholder="Observação"
          multiline
          numberOfLines={3}
        />
        <ButtonPrimary>Salvar</ButtonPrimary>
      </View>
    </>
  );
}
export default AddMatches;