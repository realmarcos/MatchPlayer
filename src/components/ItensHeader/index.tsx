import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Menu, useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ItensHeader = (props: any) => {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  const stylesLocal = StyleSheet.create({
    itensHeader: {
      position: "absolute",
      right: 0,
      margin: 25,
      flexDirection: "row",
      flexWrap: "wrap",

    }
  })
  return (
    <View style={stylesLocal.itensHeader}>
      <IconButton
        icon="bell"
        size={32}
        color={colors.primary}
        onPress={() => console.log('Pressed')}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ marginTop: getStatusBarHeight() }}
        anchor={
          <>
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image
                size={38}
                style={{ marginTop: 10 }}
                source={require('../../assets/avatar.png')}
              />

            </TouchableOpacity >
          </>
        }
      >
        <Menu.Item onPress={() => { props.nav.navigate('profile') }} title="Perfil" />
      </Menu>
    </View>
  )
}

export default ItensHeader;