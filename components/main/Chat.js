import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import NewMsgField from './chat/NewMsgField';
import Context from '../../Context'
import ChatHistory from './chat/ChatHistory';

const Chat = (props) => {

  const context = useContext(Context)

  const [chatRoom, setChatRoom] = useState(props.initChatRoom)
  const [roomID, setRoomID] = useState(null)

  useEffect(() => {
    const getRoomID = async () => {
      try {
        const dbRooms = await context.db.collection('users').doc(context.user.uid).collection('rooms') // get rooms
        const querySnapshot = await dbRooms.where("roomName", "==", chatRoom).get() // find rooms that match state chatRoom, should only be 1
        const roomIDs = [] // store rooms
        querySnapshot.forEach((doc) => {
          roomIDs.push(doc.id) // add room ID to roomIDs
        })
        if (roomIDs.length == 1) {
          setRoomID(roomIDs[0]) // set state RoomID to the ID of the room searched for
        } else {
          console.error(`THERE ARE ${roomIDs.length} ROOMS NAMED ${chatRoom}`)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getRoomID()
  }, [chatRoom])

  return (
    <View style={styles.chatView}>
      <Text>{chatRoom}</Text>
      <View style={styles.displayMsgs}>
        <ChatHistory roomID={roomID} />
      </View>
      <View style={styles.msgFieldView}>
        <NewMsgField roomID={roomID} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatView: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "brown", // TESTING BG COLOR
    alignItems: "center",
  },
  displayMsgs: {
    flex: 1,
    flexGrow: 12,
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: "violet", // TESTING BG COLOR
    padding: 5,
  },
  msgFieldView: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "plum", // TESTING BG COLOR
    padding: 5,
  }
})

export default Chat;