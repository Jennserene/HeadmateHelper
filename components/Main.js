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
import ManageRooms from './main/ManageRooms'

const Main = (props) => {

  const context = useContext(Context)

  const [systemName, setSystemName] = useState(null)
  const [nav, setNav] = useState("chat")
  const [allRooms, setAllRooms] = useState(null)
  const [currentRoom, setCurrentRoom] = useState('Main')

  const { switchMenuOpen, 
          toggleSwitchMenu, 
          addAlter, 
          makeAlterFront, 
          toggleMainMenu, 
          mainMenuOpen, 
          logOut, 
          renameAlter } = props

  // set state on mount
  useEffect( () => {
    // get system name
    const getSystemName = async () => {
      const dbUser = await context.db.collection("users").doc(context.user.uid).get()
      const dbSystemName = await dbUser.get('systemName')
      setSystemName(dbSystemName)
    }
    getSystemName()
    // Get all the rooms
    const getAllRooms = async () => {
      const dbRooms = await context.db.collection("users").doc(context.user.uid).collection('rooms')
      const dbOrderedRooms = await dbRooms.orderBy('createdAt')
      const dbRoomsList = await dbOrderedRooms.get()
      let roomNames = [] // Holder of names, contains many [name, id] arrays
      dbRoomsList.forEach((doc) => {
        let subArr = []
        subArr.push(doc.get('roomName')) // Add names of rooms to array roomNames
        subArr.push(doc.id) // Add ids too
        roomNames.push(subArr)
      })

      setAllRooms(roomNames)
      setCurrentRoom(roomNames[0][0])
    }
    getAllRooms()
  }, [])

  // Run this every time someone navigates to a different page.
  const handleNav = (page) => {
    setNav(page)
    toggleMainMenu()
  }

  // Run this every time someone navigates to a different room
  const handleRoomChange = (room) => {
    setCurrentRoom(room)
    setNav('chat')
    toggleMainMenu()
  }

  // Delete a room from allRooms
  const handleRoomDelete = (roomID) => {
    let roomArr = [...allRooms]
    for (let i = 0; i < roomArr.length; i++) {
      if (roomArr[i][1] == roomID) {
        roomArr.splice(i, 1)
        break
      }
    }
    setAllRooms(roomArr)
  }

  // Update a room's name in allRooms
  const handleRoomUpdate = (roomID, roomName) => {
    let roomArr = [...allRooms]
    for (let i = 0; i < roomArr.length; i++) {
      if (roomArr[i][1] == roomID) {
        roomArr[i][0] = roomName
        break
      }
    }
    setAllRooms(roomArr)
  }

  // Add a room to allRooms
  const handleRoomAdd = (roomName, roomID) => {
    let roomArr = [...allRooms]
    roomArr.push([roomName, roomID])
    setAllRooms(roomArr)
  }

  return (
    <View style={styles.MainView}>
      <View style={styles.ContentView}>
        { nav == 'chat' && <Chat currentRoom={currentRoom} /> }
        { nav == 'system' && <System renameAlter={renameAlter}/> }
        { nav == 'reminders' && <Reminders /> }
        { nav == 'diary' && <Diary /> }
        { nav == 'settings' && <Settings /> }
        { nav == 'about' && <About /> }
        { nav == 'manageRooms' && <ManageRooms 
                                    allRooms={allRooms} 
                                    handleRoomDelete={handleRoomDelete} 
                                    handleRoomUpdate={handleRoomUpdate}
                                    handleRoomAdd={handleRoomAdd} />}
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