import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import Context, {RoomContext} from '../../../Context'
import { putNewPublicRoom } from '../../../Firebase'
import SingleRoom from './SingleRoom'

// This component is used in components/main/ManageRooms.js
const EditRooms = (props) => {

  const context = useContext(Context)
  const roomContext = useContext(RoomContext)

  const [addRoom, setAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [error, setError] = useState('')

  const { handleRoomDelete, handleRoomUpdate, handleRoomAdd } = props

  const allPublicRooms = roomContext.allRooms.filter( room => room.type == 'public' )

  const printRooms = () => {
    return allPublicRooms.map( (room) => {
      return <SingleRoom 
                key={room.id}
                room={room} 
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
    if (roomContext.allRooms.includes(newRoomName)) {
      setError('There is already a room by that name')
      return
    }
    const newRoomID = await putNewPublicRoom(newRoomName)
    if (newRoomID) {
      handleRoomAdd(newRoomName, newRoomID)
      setError('')
      setNewRoomName('')
    } else {
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