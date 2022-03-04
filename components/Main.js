import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Context, {RoomContext} from '../Context'
import { getAllRooms, putDMNewRoom } from '../Firebase.js'

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
          updateLocalSystem,
          closeMenus, } = props

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

  // useEffect( () => {
  //   const getAvailRooms = () => {
  //     // Get only the rooms that this alter has access to
  //   }
  // }, [context.front.id])

  useEffect( () => {
    const checkRoomAccessOnSwitch = () => {
      if (!currentRoom) {return}
      if (!(nav == 'chat') || !(currentRoom.type == 'DM')) {return}
      // const numParticipants = currentRoom.participants.length
      const IDs = currentRoom.participants.map( (alter) => alter.id )
      // for (let a = 0; a < numParticipants; a++) { // Get all the IDs of participants
      //   IDs.push(currentRoom.participants[a].id)
      // }
      if (IDs.includes(context.front.id)) {return}
      const allPublicRooms = allRooms.filter( room => room.type == 'public' )
      handleRoomChange(allPublicRooms[0])
    }
    checkRoomAccessOnSwitch()
  }, [context.front.id])

  // Run this every time someone navigates to a different page.
  const handleNav = (page) => {
    setNav(page)
    closeMenus()
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
    closeMenus()
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
    roomArr.push({name: roomName, id: roomID, type: 'public'})
    setAllRooms(roomArr)
  }

  // Open a DM or create it if it doesn't exist
  const openDM = async (alters) => {
    const numParticipants = alters.length
    const allDMs = allRooms.filter( room => room.type == 'DM' )
    const rightLengthDMs = allDMs.filter( room => room.participants.length == numParticipants)
    for (let i = 0; i < rightLengthDMs.length; i++) { // For each DM
      let correctDM = true
      const IDs = rightLengthDMs[i].participants.map( (alter) => alter.id)
      // for (let a = 0; a < numParticipants; a++) { // Get all the IDs of participants
      //   IDs.push(rightLengthDMs[i].participants[a].id)
      // }
      // for loop needed to check if every participant is inside IDs
      for (let a = 0; a < numParticipants; a++) { // For each participant
        if (!IDs.includes(alters[a].id)) { // Check if that participant is contained within IDs
          correctDM = false
          break
        }
      }
      if (correctDM) {
        handleRoomChange(rightLengthDMs[i])
        return
      }
    }
    await createDM(alters)
  }

  const createDM = async (alters) => {
    const roomID = await putDMNewRoom(alters)
    handleDMAdd(roomID, alters)
  }

  // Add a DM to allRooms
  const handleDMAdd = (roomID, alters) => {
    const allDMs = allRooms.filter( room => room.type == 'DM' )
    const mostRecentTime = Math.max.apply(Math, allDMs.map( (obj) => { return obj.lastActivity; } ))
    let newRoomName = ''
    for (alter of alters) {
      if (newRoomName == '') {
        newRoomName = alter.name
      } else {
        newRoomName = newRoomName + ', ' + alter.name
      }
    }
    const newRoomObj = {
      name: newRoomName, 
      id: roomID, 
      type: 'DM', 
      lastActivity: (mostRecentTime + 1000),
      participants: alters,
    }
    let roomArr = [...allRooms]
    roomArr.push(newRoomObj)
    setAllRooms(roomArr)
    handleRoomChange(newRoomObj)
  }

  // Use useCallback to memoize functions to pass them down through context

  return (
    <View style={styles.MainView}>
      { loading ? 
        <LoadingScreen /> :
        <RoomContext.Provider value={{ // set global state
          allRooms: allRooms,
          currentRoom: currentRoom,
        }}>
          <View style={styles.MainView}>
            <View style={styles.ContentView}>
              { (nav == 'chat' && currentRoom) && <Chat/> }
              { nav == 'system' && <System 
                                      renameAlter={renameAlter} 
                                      reproxyAlter={reproxyAlter} 
                                      newAlterIntro={newAlterIntro} 
                                      updateNewAlterIntro={updateNewAlterIntro}
                                      updateLocalSystem={updateLocalSystem}
                                      openDM={openDM} /> }
              { nav == 'reminders' && <Reminders /> }
              { nav == 'diary' && <Diary /> }
              { nav == 'settings' && <Settings  
                                        updateLocalSettings={updateLocalSettings} /> }
              { nav == 'about' && <About /> }
              { nav == 'manageRooms' && <ManageRooms 
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
                  handleRoomChange={handleRoomChange}/> }
          </View>
        </RoomContext.Provider>}
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