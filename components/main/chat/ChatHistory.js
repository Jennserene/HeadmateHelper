import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Context from '../../../Context'

const ChatHistory = (props) => {

  const context = useContext(Context)

  useEffect(() => {
    const getChatHistory = async () => {
      if (props.roomID) {
        try {
          const chatSnapshot = await context.db.collection("users").doc(context.user.uid).collection('rooms').doc(props.roomID).collection('chats').get()
          const data = await chatSnapshot.docs.map( (doc) => {
            let chatMsg = {}
            chatMsg['author'] = doc.get('author')
            chatMsg['avatar'] = doc.get('avatar')
            chatMsg['text'] = doc.get('text')
            return chatMsg
          })
          console.log(data)
        } catch (err) {
          console.error(err)
        }
      }
    }
    getChatHistory()
  }, [props.roomID])

  const printMsgs = async () => {
    return <Text>Filler text</Text>
  }

  return (
    <View>
      {/* { printMsgs() } */}
    </View>
  );
}

export default ChatHistory;