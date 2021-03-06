import React, { useState, useContext } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Context, {RoomContext} from '../../../Context'
import { putNewMsg, updateDMLastActivity } from '../../../Firebase'

// This component is used in components/main/Chat.js
const NewMsgField = (props) => {

  const context = useContext(Context)
  const roomContext = useContext(RoomContext)

  const [msgText, setMsgText] = useState('')

  const { updateNewMsg } = props

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
    if (msgText == '') {return}
    const [modAuthor, modMsgText] = CheckForProxies()
    const newMsg = {
      avatar: null,
      author: modAuthor,
      text: modMsgText,
    }
    const newMsgID = await putNewMsg(roomContext.currentRoom.id, newMsg)
    if (roomContext.currentRoom.type == 'DM') {
      updateDMLastActivity(roomContext.currentRoom.id)
    }
    updateNewMsg(newMsgID)
    // Reset input field
    setMsgText('')
  }

  return (
    <View style={styles.inputView}>
      <TextInput
          style={styles.inputField}
          placeholder="Your Msg Here"
          value={msgText}
          onSubmitEditing={() => SubmitMsg()}
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
    width: 40,
    height: 40,
    backgroundColor: 'turquoise', // TESTING BG COLOR
    alignItems: "center",
    justifyContent: "center",
  },
  submitContents: {
    fontSize: 25,
  }
})

export default NewMsgField;