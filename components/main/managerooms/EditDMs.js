import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SingleRoom from './SingleRoom'

const EditDMs = (props) => {
  
  const { allRooms, handleRoomDelete, handleRoomUpdate } = props

  const printRooms = () => {
    return allRooms.map( (room) => {
      return <SingleRoom 
                key={room.id}
                room={room} 
                allRooms={allRooms}
                handleRoomDelete={handleRoomDelete}
                handleRoomUpdate={handleRoomUpdate} />
    })
  }

  return (
    <View style={styles.ContainerView}>
      <View style={styles.DMsListView}>
        { printRooms() }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerView: {

  },
  DMsListView: {

  },
})

export default EditDMs;