import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import Context from '../../Context'
import { putInitSystemData } from '../../Firebase'

// This component is used in components/LogIn.js
const CreateSystem = (props) => {

  const context = useContext(Context)

  const [systemName, setSystemName] = useState('')
  const [error, setError] = useState(null)

  const HandleSystemState = (name) => {
    setSystemName(name)
  }

  const SubmitSystem = async () => {
    setError(null)
    if (systemName == '') {
      setError('Your system name can not be blank.')
      return
    }
    await putInitSystemData(systemName)
    props.initializeAccount() // set accountInit to true
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