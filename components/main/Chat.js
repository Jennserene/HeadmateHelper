import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import NewMsgField from './chat/NewMsgField';
import Context from '../../Context'
import ChatHistory from './chat/ChatHistory';

const Chat = (props) => {

  const context = useContext(Context)

  const { currentRoom } = props

  const [newMsg, setNewMsg] = useState(null)

  const updateNewMsg = (msg) => {
    setNewMsg(msg)
  }

  return (
    <View style={styles.chatView}>
      <Text>{currentRoom.name}</Text>
      <View style={styles.displayMsgs}>
        { currentRoom && <ChatHistory roomID={currentRoom.id} newMsg={newMsg} /> }
      </View>
      <View style={styles.msgFieldView}>
        <NewMsgField roomID={currentRoom.id} updateNewMsg={updateNewMsg} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatView: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
  },
  displayMsgs: {
    flex: 1,
    flexGrow: 12,
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 5,
  },
  msgFieldView: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: '#BFA8FF',
    padding: 5,
  }
})

export default Chat;