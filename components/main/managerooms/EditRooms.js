import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import Context from '../../../Context'
import * as firebase from 'firebase'
import SingleRoom from './SingleRoom'

const EditRooms = (props) => {

  const context = useContext(Context)

  const [addRoom, setAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [error, setError] = useState('')

  const { allRooms, handleRoomDelete, handleRoomUpdate, handleRoomAdd } = props

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

  const toggleAdd = () => {
    setAddRoom(!addRoom)
    setError('')
  }

  const handleName = (text) => {
    setNewRoomName(text)
  }

  const handleSubmit = async () => {
    if (newRoomName == '') {
      setError('Room name can not be blank')
      return
    }
    if (allRooms.includes(newRoomName)) {
      setError('There is already a room by that name')
      return
    }
    const newRoom = {
      roomName: newRoomName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    try {
      // Replace with putNewRoom(newRoomName) from ../../../Firebase.js
      const newRoomDB = await context.db.collection('users').doc(context.user.uid).collection('rooms').add(newRoom)
      handleRoomAdd(newRoomName, newRoomDB.id)
      setError('')
      setNewRoomName('')
    } catch (err) {
      console.log(err)
      setError('Something went wrong!')
    }
  }

  return (
    <View style={styles.ContainerView}>
      <View style={styles.RoomsListView}>
        { printRooms() }
      </View>
      { !addRoom ? 
        <View style={styles.RoomAddView}>
          <Pressable 
              onPress={ () => {toggleAdd()}}
              accessible={true} 
              accessibilityLabel="Add Room"
              accessibilityHint="Tap here to add an additional room"
              accessibilityRole="button">
            <View style={styles.AddButtonView}>
              <Text style={styles.ButtonText}>Add room</Text>
            </View>
          </Pressable>
        </View>: null }
      { addRoom ? 
        <View style={styles.RoomAddView}>
          <Pressable 
              onPress={ () => {toggleAdd()}}
              accessible={true} 
              accessibilityLabel="Cancel"
              accessibilityHint="Cancel adding a new room"
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Cancel</Text>
            </View>
          </Pressable>
          <TextInput
            style={styles.InputField}
            placeholder="Room Name"
            value={newRoomName}
            onChangeText={(text) => {handleName(text)}}/>
          <Pressable 
              onPress={ () => {handleSubmit()}}
              accessible={true} 
              accessibilityLabel="Submit"
              accessibilityHint="After typing in the name of a new room, tap here to create it."
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Submit</Text>
            </View>
          </Pressable>
        </View>: null }
      { error ? 
        <View style={styles.ErrorView}>
          <Text>{error}</Text>
        </View> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerView: {

  },
  RoomsListView: {

  },
  RoomAddView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  AddButtonView: {
    backgroundColor: 'aqua',
    height: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  ButtonView: {
    backgroundColor: 'aqua',
    height: 25,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  InputField: {
    width: '60%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
    marginRight: 5,
  },
  ButtonText: {

  },
  ErrorView: {

  },
})

export default EditRooms;