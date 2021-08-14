import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import Context from '../../Context'

const CreateSystem = (props) => {

  const context = useContext(Context)

  const [systemName, setSystemName] = useState('')

  const HandleSystemState = (name) => {
    setSystemName(name)
  }

  const SubmitSystem = async () => {
    try {
      context.db.collection('users').doc(context.userUID).set({ // Create doc with user's UID with two fields in it
        systemName: systemName,
        accountInit: true
      }, {merge: true})
      const dbUser = props.db.collection('users').doc(props.loggedIn)
      const initFront = await dbUser.collection('alters').add({ // create 'alters' collection inside user doc
        name: 'Unknown'
      })
      const room = await dbUser.collection('rooms').add({ // create 'rooms' collection inside user doc
        roomName: 'Main'
      })
      props.initializeAccount() // set accountInit to true
    } catch (error) {
      console.error(error)
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
      <View style={styles.SystemInput}>
        <TextInput
          style={styles.InputField}
          placeholder="System Name"
          onChangeText={name => HandleSystemState(name)}/>
        <Pressable style={styles.SubmitButton} onPress={() => SubmitSystem()}>
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
    backgroundColor: "teal",
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