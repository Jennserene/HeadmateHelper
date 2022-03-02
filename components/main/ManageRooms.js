import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import EditRooms from './managerooms/EditRooms'
import EditDMs from './managerooms/EditDMs'

const ManageRooms = (props) => {

  const { allRooms, handleRoomDelete, handleRoomUpdate, handleRoomAdd } = props

  const [ publicRooms, setPublicRooms ] = useState(null)
  const [ allDMs, setAllDMs ] = useState(null)

  useEffect( () => {
    const getRoomsOnMount = () => {
      const pRooms = allRooms.filter( room => room.type == 'public' )
      const DMs = allRooms.filter( room => room.type == 'DM' )
      setPublicRooms(pRooms)
      setAllDMs(DMs)
    }
    getRoomsOnMount()
  }, [])

  return (
    <ScrollView>
      <View style={styles.RoomsView}>
        { publicRooms && <EditRooms 
          allRooms={publicRooms}
          handleRoomDelete={handleRoomDelete}
          handleRoomUpdate={handleRoomUpdate}
          handleRoomAdd={handleRoomAdd} /> }
      </View>
      <View style={styles.DMsView}>
        { allDMs && <EditDMs 
          allRooms={allDMs}
          handleRoomDelete={handleRoomDelete}
          handleRoomUpdate={handleRoomUpdate}/> }
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