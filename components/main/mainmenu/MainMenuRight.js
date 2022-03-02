import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { setRoomTypePublic } from '../../../Firebase'
import Context from '../../../Context'

const MainMenuRight = (props) => {

  const context = useContext(Context)

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

  const printRecentDMs = () => {
    if (allRooms) {
      const allDMsRaw = allRooms.filter(room => room.type == 'DM')
      const myDMs = allDMsRaw.filter(room => {
        for (const alter of room.participants) {
          if (alter.id == context.front.id) {
            return true
          }
        }})
      myDMs.sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1))
      return myDMs.map( (room) => {
        return <View key={room.id} style={styles.LinkView}>
        <Pressable 
            onPress={ () => {changeRoom(room)}}
            accessible={true} 
            accessibilityLabel={`Open the ${room.name} DM.`}
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
      <ScrollView>
        <View style={styles.SubHeaderView}>
          <Text style={styles.SubHeaderText}>Rooms</Text>
        </View>
        { printAllRooms() }
        <View style={styles.SubHeaderView}>
          <Text style={styles.SubHeaderText}>Recent DMs</Text>
        </View>
        { printRecentDMs() }
      </ScrollView>
      <View style={styles.FooterView}>
        <Pressable 
            onPress={ () => {handleNav('manageRooms')}}
            accessible={true} 
            accessibilityLabel="Manage Rooms and DMs"
            accessibilityRole="button">
          <Text>Manage Rooms/DMs</Text>
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