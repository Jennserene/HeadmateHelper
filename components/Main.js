import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Chat from './main/Chat'
import SwitchMenu from './main/SwitchMenu'

const Main = (props) => {

  const nav = props.nav
  const switchMenuOpen = props.switchMenuOpen
  const toggleSwitchMenu = props.toggleSwitchMenu
  const addAlter = props.addAlter

  return (
    <View style={styles.MainView}>
      <View style={styles.ContentView}>
        { nav == 'chat' && <Chat initChatRoom='Main' /> }
      </View>
      { switchMenuOpen && <SwitchMenu 
                            style={styles.SwitchMenu} 
                            toggleSwitchMenu={toggleSwitchMenu}
                            addAlter={addAlter} /> }
    </View>
  )
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  ContentView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  SwitchMenu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
})

export default Main