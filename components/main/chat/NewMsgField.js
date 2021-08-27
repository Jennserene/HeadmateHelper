import React, { useState, useContext } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Context from '../../../Context'
import * as firebase from 'firebase'

const NewMsgField = (props) => {

  const context = useContext(Context)

  const [msgText, setMsgText] = useState('')

  const HandleMsgText = (text) => {
    setMsgText(text)
  }

  const SubmitMsg = async () => {
    try {
      const dbRoomChats = await context.db.collection('users').doc(context.user.uid).collection('rooms').doc(props.roomID).collection('chats')
      const dbNewChat = dbRoomChats.add({
        avatar: null,
        author: context.frontName,
        text: msgText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

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
      <Pressable style={styles.submitButton} onPress={() => SubmitMsg()}>
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