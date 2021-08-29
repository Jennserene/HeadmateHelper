import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Context from '../Context'
import Chat from './main/Chat'
import SwitchMenu from './main/SwitchMenu'
import MainMenu from './main/MainMenu'
import System from './main/System'
import Settings from './main/Settings'
import About from './main/About'
import Reminders from './main/Reminders'
import Diary from './main/Diary'

const Main = (props) => {

  const context = useContext(Context)

  const [systemName, setSystemName] = useState(null)
  const [nav, setNav] = useState("chat")
  const [allRooms, setAllRooms] = useState(null)
  const [currentRoom, setCurrentRoom] = useState('Main')

  const { switchMenuOpen, toggleSwitchMenu, addAlter, makeAlterFront, toggleMainMenu, mainMenuOpen, logOut } = props

  // set state on mount
  useEffect( () => {
    // get system name
    const getSystemName = async () => {
      const dbUser = await context.db.collection("users").doc(context.user.uid).get()
      const dbSystemName = await dbUser.get('systemName')
      setSystemName(dbSystemName)
    }
    getSystemName()
    const getAllRooms = async () => {
      const dbRooms = await context.db.collection("users").doc(context.user.uid).collection('rooms').get()
      let roomNames = [] // Holder of names, contains many
      dbRooms.forEach((doc) => {
        roomNames.push(doc.get('roomName')) // Add names of rooms to array roomNames
      })
      setAllRooms(roomNames)
    }
    getAllRooms()
  }, [])

  const handleNav = (page) => {
    setNav(page)
    toggleMainMenu()
  }

  const handleRoomChange = (room) => {
    setCurrentRoom(room)
    setNav('chat')
    toggleMainMenu()
  }

  return (
    <View style={styles.MainView}>
      <View style={styles.ContentView}>
        { nav == 'chat' && <Chat currentRoom={currentRoom} /> }
        { nav == 'system' && <System /> }
        { nav == 'reminders' && <Reminders /> }
        { nav == 'diary' && <Diary /> }
        { nav == 'settings' && <Settings /> }
        { nav == 'about' && <About /> }
      </View>
      { switchMenuOpen && <SwitchMenu 
                            style={styles.SwitchMenu} 
                            toggleSwitchMenu={toggleSwitchMenu}
                            addAlter={addAlter}
                            makeAlterFront={makeAlterFront} /> }
      { mainMenuOpen && <MainMenu 
                          style={styles.MainMenu} 
                          toggleMainMenu={toggleMainMenu} 
                          systemName={systemName} 
                          logOut={logOut} 
                          handleNav={handleNav} 
                          allRooms={allRooms} 
                          handleRoomChange={handleRoomChange}/> }
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