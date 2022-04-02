import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Text, useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface Header {
  title?: string;
  children?: any;
}

const Header = (props: Header, { navigation }: any) => {
  const { colors, fonts } = useTheme();
  const statusBarHeight = getStatusBarHeight();
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#3D1459',
      // position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      marginTop: statusBarHeight,
    },
    title: {
      color: colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 25
    }
  })
  return (
    <Appbar style={styles.header}>
      {props.children}
      <Text style={styles.title}>{props.title}</Text>
    </Appbar >
  )
}

export default Header