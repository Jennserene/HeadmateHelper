import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import Context from '../../../Context'
import * as firebase from 'firebase'

const SingleRoom = (props) => {

  const context = useContext(Context)

  const { room, allRooms, handleRoomDelete, handleRoomUpdate } = props

  const [editRoom, setEditRoom] = useState(false)
  const [roomName, setRoomName] = useState(room[0])
  const [error, setError] = useState('')

  const toggleEdit = () => {
    setEditRoom(!editRoom)
    setError('')
  }

  const handleDelete = async () => {
    if (allRooms.length < 2) {
      setError('You must have at least 1 room!')
      return
    }
    if (roomName !== 'Delete Me!') {
      setError('To delete this room you must set the room name to "Delete Me!" (Case sensitive)')
      return
    }
    try {
      const roomDB = await context.db.collection('users').doc(context.user.uid).collection('rooms').doc(room[1]).get()
      roomDB.ref.delete()
      setError('')
      handleRoomDelete(room[1]) // remove the room from allRooms
    } catch (err) {
      console.error(err)
      setError('Something went wrong!')
    }
  }

  const handleSubmit = async () => {
    if (roomName == '') {
      setError('Room name can not be blank')
      return
    }
    if (allRooms.includes(roomName)) {
      setError('There is already a room by that name')
      return
    }
    try {
      const roomDB = await context.db.collection('users').doc(context.user.uid).collection('rooms').doc(room[1]).update({roomName: roomName})
      handleRoomUpdate(room[1], roomName)// Update allRooms by changing this room name
      toggleEdit()
    } catch (err) {
      console.error(err)
      setError('Something went wrong!')
    }
  }

  const handleName = (name) => {
    setRoomName(name)
  }

  return (
    <View style={styles.ContainerView}>
      { !editRoom ? 
        <View style={styles.RoomView}>
          <Pressable 
              onPress={ () => {toggleEdit()}}
              accessible={true} 
              accessibilityLabel="Edit Room Name"
              accessibilityHint="Tap here to change this room's name"
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Edit</Text>
            </View>
          </Pressable>
          <Pressable 
              onPress={ () => {handleDelete()}}
              accessible={true} 
              accessibilityLabel="Delete Room"
              accessibilityHint="Tap here to delete this room. You must have changed the room name to 'Delete Me!' (capital D and M and an exclamation point at the end)"
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Delete</Text>
            </View>
          </Pressable>
          <Text>{room[0]}</Text>
        </View> : null }
      { editRoom ? 
        <View style={styles.RoomView}>
          <Pressable 
              onPress={ () => {toggleEdit()}}
              accessible={true} 
              accessibilityLabel="Cancel"
              accessibilityHint="Tap here to cancel changing this room's name."
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Cancel</Text>
            </View>
          </Pressable>
          <TextInput
            style={styles.InputField}
            value={roomName}
            onChangeText={(text) => {handleName(text)}}/>
          <Pressable 
              onPress={ () => {handleSubmit()}}
              accessible={true} 
              accessibilityLabel="Submit"
              accessibilityHint="Tap here to submit the new name for this room."
              accessibilityRole="button">
            <View style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Submit</Text>
            </View>
          </Pressable>
        </View> : null }
      { error ? 
        <View style={styles.ErrorView}>
          <Text>{error}</Text>
        </View> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerView: {
    marginBottom: 5,
  },
  RoomView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ErrorView: {

  },
  ButtonView: {
    backgroundColor: 'aqua',
    height: 25,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  ButtonText: {

  },
  InputField: {
    width: '60%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
    marginRight: 5,
  }
})

export default SingleRoom;