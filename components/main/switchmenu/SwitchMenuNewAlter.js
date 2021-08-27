import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import * as firebase from 'firebase'
import Context from '../../../Context'

const SwitchMenuNewAlter = (props) => {
  
  const context = useContext(Context)

  const [name, setName] = useState('')
  const [nameErrorExists, setNameErrorExists] = useState(false)
  const [nameError, setNameError] = useState('')
  const [proxy, setProxy] = useState('')

  // Switch to Switch menu
  const ToggleMenuState = () => {
    props.menuStateToggle()
  }

  const HandleName = (text) => {
    setName(text)
  }

  const HandleProxy = (text) => {console.log('NEW ALTER: ', dbNewAlter)
  }

  // Close the menu
  const SwitchToggle = () => {
    props.toggleSwitchMenu()
  }

  const SubmitAlter = async () => {
    if (!name) { // If the name field is empty
      setNameErrorExists(true)
      setNameError('A name is required!')
      return
    }
    let dbNewAlter = null
    try {
      const dbAlters = await context.db.collection('users').doc(context.user.uid).collection('alters')
      if (!proxy) { // If there is no proxy
        dbNewAlter = await dbAlters.add({
          name: name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      } else { // If there is a proxy
        dbNewAlter = await dbAlters.add({
          name: name,
          proxy: proxy,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      }

    } catch (err) {
      console.error(err)
    }
    
    props.addAlter(name)

    // Reset input field
    setName('')
    setNameErrorExists(false)
    setNameError('')
    setProxy('')
    SwitchToggle()
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
        <Pressable style={styles.GoBackButton} onPress={ () => {ToggleMenuState()}}>
          <Text>Go Back</Text></Pressable>
        <Pressable style={styles.SubmitButton} onPress={ () => {SubmitAlter()}}>
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