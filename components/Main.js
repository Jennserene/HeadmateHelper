import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Chat from './main/Chat'

const Main = (props) => {

  const nav = props.nav

  return (
    <View style={styles.MainView}>
      { nav == 'chat' && <Chat initChatRoom='Main' /> }
    </View>
  )
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
})

export default Main