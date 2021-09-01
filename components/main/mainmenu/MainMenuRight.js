import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const MainMenuRight = (props) => {

  const { allRooms, handleRoomChange } = props

  const changeRoom = (room) => {
    handleRoomChange(room.room)
  }

  const printAllRooms = () => {
    if (allRooms) {
      return allRooms.map( (room) => {
        return <View key={room} style={styles.LinkView}>
        <Pressable onPress={ () => {changeRoom({room})}}>
          <Text style={styles.LinkText}>{room}</Text>
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
      { printAllRooms() }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%'
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
})

export default MainMenuRight;