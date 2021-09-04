import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import EditRooms from './managerooms/EditRooms'
import EditDMs from './managerooms/EditDMs'

const ManageRooms = (props) => {

  const { allRooms, handleRoomDelete, handleRoomUpdate, handleRoomAdd } = props

  return (
    <ScrollView>
      <View style={styles.RoomsView}>
        <EditRooms 
          allRooms={allRooms}
          handleRoomDelete={handleRoomDelete}
          handleRoomUpdate={handleRoomUpdate}
          handleRoomAdd={handleRoomAdd} />
      </View>
      <View style={styles.DMsView}>
        <EditDMs />
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