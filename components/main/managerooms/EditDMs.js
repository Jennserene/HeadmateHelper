import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Context, {RoomContext} from '../../../Context'
import SingleRoom from './SingleRoom'

const EditDMs = (props) => {

  const context = useContext(Context)
  const roomContext = useContext(RoomContext)
  
  const { handleRoomDelete, handleRoomUpdate } = props
  
  const [ allDMs, setAllDMs ] = useState(null)

  useEffect( () => {
    const getState = () => {
      const allDMsRaw = roomContext.allRooms.filter(room => room.type == 'DM')
      const myDMs = allDMsRaw.filter(room => {
        for (const id of room.participants) {
          if (id == context.front.id) {
            return true
      }}})
      setAllDMs(myDMs)
    }
    getState()
  }, [context.front.id])
  

  const printRooms = () => {
    return allDMs.map( (room) => {
      return <SingleRoom 
                key={room.id}
                room={room} 
                handleRoomDelete={handleRoomDelete}
                handleRoomUpdate={handleRoomUpdate} />
    })
  }

  return (
    <View style={styles.ContainerView}>
      <View style={styles.DMsListView}>
        { allDMs && printRooms() }
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