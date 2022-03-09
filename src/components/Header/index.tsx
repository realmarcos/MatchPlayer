import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface Header {
  title: string;
  children?: any
}

const Header = (props: Header) => {
  const { colors } = useTheme();
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
    <Appbar style={styles.header} >
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </Appbar >
  )
}

export default Header