import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import Context from '../../../Context'
import { putNewAlter } from '../../../Firebase';

// This component is used in components/main/SwitchMenu.js
const SwitchMenuNewAlter = (props) => {
  
  const context = useContext(Context)

  const [name, setName] = useState('')
  const [nameErrorExists, setNameErrorExists] = useState(false)
  const [nameError, setNameError] = useState('')
  const [proxy, setProxy] = useState('')

  const { menuStateToggle, toggleSwitchMenu, addAlter, makeAlterFront, newAlterIntro } = props

  // Switch to Switch menu
  const ToggleMenuState = () => {
    menuStateToggle('choose')
  }

  const HandleName = (text) => {
    setName(text)
  }

  const HandleProxy = (text) => {
    setProxy(text)
  }

  // Close the menu
  const SwitchToggle = () => {
    toggleSwitchMenu()
  }

  const SubmitAlter = async () => {
    if (!name) { // If the name field is empty
      setNameErrorExists(true)
      setNameError('A name is required!')
      return
    }
    if (context.allAlters.some( alter => alter.name === name )) { // If there is already an alter by that name
      setNameErrorExists(true)
      setNameError('There is already an alter by that name!')
      return
    }
    const newAlterID = await putNewAlter(name, proxy) 
    addAlter({ // Add alter to allAlters
      name: name,
      id: newAlterID,
      proxy: proxy,
    })
    await makeAlterFront(newAlterID) // Make this new alter be front
    // Reset input field
    setName('')
    setNameErrorExists(false)
    setNameError('')
    setProxy('')
    if ((newAlterIntro !== '') && (context.settings.introVisible === true)) {
      menuStateToggle('NAIntro')
    } else {
      SwitchToggle()
    }
  }

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.HeaderText}>New Alter</Text>
      <View style={styles.FormView}>
        <View style={styles.FieldView}>
          <Text style={styles.FieldText}>Name:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="What is your name?"
            value={name}
            onChangeText={text => HandleName(text)}/>
        </View>
        { nameErrorExists && <Text style={styles.NameErrorText}>{nameError}</Text> }
        <View style={styles.FieldView}>
          <Text style={styles.FieldText}>Proxy:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="What proxy would you like?"
            value={proxy}
            onChangeText={text => HandleProxy(text)}/>
        </View>
      </View>
      <View style={styles.ButtonsView}>
        <Pressable 
            style={styles.GoBackButton} 
            onPress={ () => {ToggleMenuState()}}
            accessible={true} 
            accessibilityLabel="Go back"
            accessibilityHint="Go back to the switch menu"
            accessibilityRole="button">
          <Text>Go Back</Text></Pressable>
        <Pressable 
            style={styles.SubmitButton} 
            onPress={ () => {SubmitAlter()}}
            accessible={true} 
            accessibilityLabel="Submit new alter"
            accessibilityHint="Once you have typed in a name for yourself, tap here to register yourself."
            accessibilityRole="button">
          <Text>Submit</Text></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerView: {
    paddingTop: 10,
    paddingLeft: 50,
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  FormView: {

  },
  FieldView: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  FieldText: {
    fontSize: 20,
    paddingRight: 10,
  },
  inputField: {
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
  },
  NameErrorText: {
    color: 'red',
  },
  ButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 50,
  },
  GoBackButton: {
    backgroundColor: 'aqua',
    height: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitButton: {
    backgroundColor: 'aqua',
    height: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default SwitchMenuNewAlter;