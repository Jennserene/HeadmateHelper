import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import Context from '../../Context'
import * as firebase from 'firebase'

const CreateSystem = (props) => {

  const context = useContext(Context)

  const [systemName, setSystemName] = useState('')
  const [error, setError] = useState(null)

  const HandleSystemState = (name) => {
    setSystemName(name)
  }

  const SubmitSystem = async () => {
    if (systemName == '') {
      setError('Your system name can not be blank.')
      return
    }
    try {
      // Replace with putInitSystemData(systemName) from ../../Firebase.js
      context.db.collection('users').doc(context.user.uid).set({ // Create doc with user's UID with two fields in it
        systemName: systemName,
        accountInit: true
      }, {merge: true})
      const dbUser = context.db.collection('users').doc(context.user.uid)
      const initFront = await dbUser.collection('alters').doc('unknown').set({ // create 'alters' collection inside user doc
        name: 'Unknown',
        lastFront: firebase.firestore.FieldValue.serverTimestamp()
      })
      const room = await dbUser.collection('rooms').add({ // create 'rooms' collection inside user doc
        roomName: 'Main',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setError(null)
      props.initializeAccount() // set accountInit to true
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={styles.CreateSystemView}>
      <Text>
        What do you call your system as a whole?
      </Text>
      <Text>
        You can change this later.
      </Text>
      { error ? <Text>{error}</Text> : null }
      <View style={styles.SystemInput}>
        <TextInput
          style={styles.InputField}
          placeholder="System Name"
          onChangeText={name => HandleSystemState(name)}/>
        <Pressable 
            style={styles.SubmitButton} 
            onPress={() => SubmitSystem()}
            accessible={true} 
            accessibilityLabel="Initialize your System"
            accessibilityHint="Creates your system. Make sure you have typed in a system name."
            accessibilityRole='button'>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  CreateSystemView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    flexGrow: 1,
  },
  SystemInput: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  SubmitButton: {
    backgroundColor: "teal", // TESTING BG COLOR
    height: 20,
  },
  InputField: {
    margin: 15,
    height: 40,
    width: 150,
    borderColor: '#7a42f4',
    borderWidth: 1,
  }
})

export default CreateSystem