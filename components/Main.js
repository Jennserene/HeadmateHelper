import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Context from '../Context'
import { getAllRooms } from '../Firebase.js'

// Import components
import Chat from './main/Chat'
import SwitchMenu from './main/SwitchMenu'
import MainMenu from './main/MainMenu'
import System from './main/System'
import Settings from './main/Settings'
import About from './main/About'
import Reminders from './main/Reminders'
import Diary from './main/Diary'
import ManageRooms from './main/ManageRooms'
import LoadingScreen from './LoadingScreen'

const Main = (props) => {

  const context = useContext(Context)

  const [nav, setNav] = useState("chat")
  const [allRooms, setAllRooms] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  const { switchMenuOpen, 
          toggleSwitchMenu, 
          addAlter, 
          makeAlterFront, 
          toggleMainMenu, 
          mainMenuOpen, 
          logOut, 
          renameAlter,
          reproxyAlter,
          newAlterIntro, 
          updateNewAlterIntro,
          updateLocalSettings,
          updateLocalSystem, } = props

  // set state on mount
  useEffect( () => {
    const getStateOnMount = async () => {
      // Get all the rooms
      const roomNames = await getAllRooms()
      setAllRooms(roomNames)
      setCurrentRoom(roomNames[0])
      makeLoadingFalse()
    }
    getStateOnMount()
  }, [])

  // Run this every time someone navigates to a different page.
  const handleNav = (page) => {
    setNav(page)
    toggleMainMenu()
  }

  const toggleLoading = () => {
    setLoading(!loading)
  }

  const makeLoadingFalse = () => {
    setLoading(false)
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
      if (roomArr[i].id == roomID) {
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
      if (roomArr[i].id == roomID) {
        roomArr[i].name = roomName
        break
      }
    }
    setAllRooms(roomArr)
  }

  // Add a room to allRooms
  const handleRoomAdd = (roomName, roomID) => {
    let roomArr = [...allRooms]
    roomArr.push({name: roomName, id: roomID})
    setAllRooms(roomArr)
  }

  return (
    <View style={styles.MainView}>
      { loading ? 
        <LoadingScreen /> :
        <View style={styles.MainView}>
          <View style={styles.ContentView}>
            { (nav == 'chat' && currentRoom) && <Chat currentRoom={currentRoom} /> }
            { nav == 'system' && <System 
                                    renameAlter={renameAlter} 
                                    reproxyAlter={reproxyAlter} 
                                    newAlterIntro={newAlterIntro} 
                                    updateNewAlterIntro={updateNewAlterIntro}
                                    updateLocalSystem={updateLocalSystem} /> }
            { nav == 'reminders' && <Reminders /> }
            { nav == 'diary' && <Diary /> }
            { nav == 'settings' && <Settings  
                                      updateLocalSettings={updateLocalSettings} /> }
            { nav == 'about' && <About /> }
            { nav == 'manageRooms' && <ManageRooms 
                                        allRooms={allRooms} 
                                        handleRoomDelete={handleRoomDelete} 
                                        handleRoomUpdate={handleRoomUpdate}
                                        handleRoomAdd={handleRoomAdd} />}
          </View>
          { (switchMenuOpen && context.allAlters) && 
              <SwitchMenu 
                style={styles.SwitchMenu} 
                toggleSwitchMenu={toggleSwitchMenu}
                addAlter={addAlter}
                makeAlterFront={makeAlterFront}
                newAlterIntro={newAlterIntro} /> }
          { mainMenuOpen && 
              <MainMenu 
                style={styles.MainMenu} 
                toggleMainMenu={toggleMainMenu}  
                logOut={logOut} 
                handleNav={handleNav} 
                allRooms={allRooms} 
                handleRoomChange={handleRoomChange}/> }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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