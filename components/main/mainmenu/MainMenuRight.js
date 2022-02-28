import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { setRoomTypePublic } from '../../../Firebase'

const MainMenuRight = (props) => {

  const { allRooms, handleRoomChange, toggleMainMenu, handleNav } = props

  const changeRoom = (room) => {
    handleRoomChange(room)
  }

  const publicRoomsFilter = (room) => {
    if (room.type == undefined) { // TEMP - in case room does not have type
      setRoomTypePublic(room.id)
      return true
    }
    if (room.type == 'public') {return true}
  }

  const printAllRooms = () => {
    if (allRooms) {
      const allPublicRooms = allRooms.filter(publicRoomsFilter)
      return allPublicRooms.map( (room) => {
        return <View key={room.id} style={styles.LinkView}>
        <Pressable 
            onPress={ () => {changeRoom(room)}}
            accessible={true} 
            accessibilityLabel={`Open the ${room.name} room.`}
            accessibilityRole="button">
          <Text style={styles.LinkText}>{room.name}</Text>
        </Pressable>
      </View>
      })
    } else {
      return <Text>Loading...</Text>
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.SubHeaderView}>
        <Text style={styles.SubHeaderText}>Rooms</Text>
      </View>
      <ScrollView>
        { printAllRooms() }
      </ScrollView>
      <View style={styles.FooterView}>
        <Pressable 
            onPress={ () => {handleNav('manageRooms')}}
            accessible={true} 
            accessibilityLabel="Manage Rooms and DMs"
            accessibilityRole="button">
          <Text>Manage Rooms</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    flexGrow: 1,
  },
  LinkView: {
    paddingBottom: 10,
  },
  LinkText: {
    fontSize: 15,
  },
  SubHeaderView: {
    paddingLeft: 20,
  },
  SubHeaderText: {
    fontWeight: 'bold',
  },
  FooterView: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})

export default MainMenuRight;