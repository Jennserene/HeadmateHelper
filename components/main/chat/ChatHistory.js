import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Context from '../../../Context'
import ChatMsg from './ChatMsg'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ChatHistory = (props) => {

  const context = useContext(Context)

  const { roomID } = props

  const messagesRef = context.db.collection("users").doc(context.user.uid).collection('rooms').doc(roomID).collection('chats')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, { idField: 'id' })

  const printMsgs = () => {
    return messages.map( (msg) => {
      return <ChatMsg key={msg.id} message={msg} />
    })
  }

  return (
    <View style={styles.ChatHistView}>
      { messages && printMsgs() }
    </View>
  );
}

const styles = StyleSheet.create({
  ChatHistView: {
    alignItems: 'flex-end'
  }
})

export default ChatHistory;