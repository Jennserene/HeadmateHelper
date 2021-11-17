import React, { useState, useContext } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Context from '../../../Context'
import * as firebase from 'firebase'

const NewMsgField = (props) => {

  const context = useContext(Context)

  const [msgText, setMsgText] = useState('')

  const { roomID, updateNewMsg } = props

  const HandleMsgText = (text) => {
    setMsgText(text)
  }

  const CheckForProxies = () => {
    for (i = 0; i < context.allAlters.length; i++) {
      if (context.allAlters[i].proxy === '' || 
          context.allAlters[i].proxy === null || 
          context.allAlters[i].proxy === undefined) {
        continue
      }
      if (msgText.startsWith(context.allAlters[i].proxy)) {
        const proxyLen = context.allAlters[i].proxy.length
        let tempMsg = msgText
        tempMsg = tempMsg.substring(proxyLen)
        if (tempMsg.startsWith(' ')) {
          tempMsg = tempMsg.substring(1)
        }
        return [context.allAlters[i].name, tempMsg]
      }
    }
    return [context.front.name, msgText]
  }

  const SubmitMsg = async () => {
    if (msgText == '') {
      return
    }
    const [modAuthor, modMsgText] = CheckForProxies()
    try {
      const timeDate = await firebase.firestore.FieldValue.serverTimestamp()
      const newMsg = {
        avatar: null,
        author: modAuthor,
        text: modMsgText,
        createdAt: timeDate // on Firebase Upgrade pass this in without this line.
      }
      const dbRoomChats = await context.db.collection('users').doc(context.user.uid).collection('rooms').doc(roomID).collection('chats')
      const dbNewChat = await dbRoomChats.add(newMsg)
      updateNewMsg(dbNewChat.id)

    } catch (err) {
      console.error(err)
    }
    
    // Reset input field
    setMsgText('')
  }

  return (
    <View style={styles.inputView}>
      <TextInput
          style={styles.inputField}
          placeholder="Your Msg Here"
          value={msgText}
          onChangeText={text => HandleMsgText(text)}/>
      <Pressable 
          style={styles.submitButton} 
          onPress={() => SubmitMsg()}
          accessible={true} 
          accessibilityLabel="Send Message"
          accessibilityHint="Sends the message you typed in."
          accessibilityRole='button'>
        <Text style={styles.submitContents}>&gt;</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: "row"

  },
  inputField: {
    width: '90%'
  },
  submitButton: {
    padding: 10,
    width: 40,
    backgroundColor: 'turquoise', // TESTING BG COLOR
    alignItems: "center",
    justifyContent: "center",
  },
  submitContents: {
    fontSize: 30,
  }
})

export default NewMsgField;