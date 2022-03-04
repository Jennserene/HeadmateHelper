import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { RoomContext } from '../../Context'
import EditRooms from './managerooms/EditRooms'
import EditDMs from './managerooms/EditDMs'

const ManageRooms = (props) => {

  // const roomContext = useContext(RoomContext)

  const { handleRoomDelete, handleRoomUpdate, handleRoomAdd } = props

  // const [ publicRooms, setPublicRooms ] = useState(null)
  // const [ allDMs, setAllDMs ] = useState(null)

  // useEffect( () => {
  //   const getRoomsOnMount = () => {
  //     const pRooms = roomContext.allRooms.filter( room => room.type == 'public' )
  //     const DMs = roomContext.allRooms.filter( room => room.type == 'DM' )
  //     setPublicRooms(pRooms)
  //     setAllDMs(DMs)
  //   }
  //   getRoomsOnMount()
  // }, [])

  return (
    <ScrollView>
      <View style={styles.RoomsView}>
        <EditRooms 
          handleRoomDelete={handleRoomDelete}
          handleRoomUpdate={handleRoomUpdate}
          handleRoomAdd={handleRoomAdd} />
      </View>
      <View style={styles.DMsView}>
        <EditDMs 
          handleRoomDelete={handleRoomDelete}
          handleRoomUpdate={handleRoomUpdate}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  RoomsView: {
    padding: 10,
  },
  DMsView: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderStyle: 'solid',
    padding: 10,
  },
})

export default ManageRooms;