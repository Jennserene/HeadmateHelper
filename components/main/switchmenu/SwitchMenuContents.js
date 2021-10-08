import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native'
import SwitchMenuPicker from './SwitchMenuPicker'

const SwitchMenuContents = (props) => {

  const { menuStateToggle, toggleSwitchMenu, makeAlterFront } = props

  const [pickerSelection, setPickerSelection] = useState(null)
  const [nameErrorExists, setNameErrorExists] = useState(false)
  const [nameError, setNameError] = useState('')

  // Switch to New Alter menu
  const ToggleMenuState = () => {
    menuStateToggle()
  }

  // Close the menu
  const SwitchToggle = () => {
    toggleSwitchMenu()
  }

  // Make Unknown Front
  const MakeUnknownFront = () => {
    makeAlterFront('Unknown')
    SwitchToggle()
  }

  // Change picker selection
  const handlePicker = (alter) => {
    setPickerSelection(alter)
  }

  // Make selected alter front
  const MakeAlterFront = () => {
    if (!pickerSelection || pickerSelection == 'default') {
      setNameErrorExists(true)
      setNameError('You must select an alter!')
      return
    }
    makeAlterFront(pickerSelection)
    setNameErrorExists(false)
    setNameError('')
    SwitchToggle()
  }

  return (
    <View>
      <Text style={styles.HeaderText}>Who is Front?</Text>
      <View style={styles.SelectionView}>
        <Pressable 
            style={styles.SwitchButtons} 
            onPress={ () => {MakeAlterFront()}}
            accessible={true} 
            accessibilityLabel="Switch to selected Alter"
            accessibilityHint="Select an alter on the right and then press this button to switch to that alter."
            accessibilityRole="button">
          <Text>Switch</Text></Pressable>
        <SwitchMenuPicker handlePicker={handlePicker} />
      </View>
      { nameErrorExists && <Text style={styles.NameErrorText}>{nameError}</Text> }
      <View style={styles.SelectionView}>
        <Pressable 
            style={styles.SwitchPressable} 
            onPress={ () => {ToggleMenuState()}}
            accessible={true} 
            accessibilityLabel="Create new alter"
            accessibilityHint="If you have not yet registered yourself in this app, tap here to register yourself."
            accessibilityRole="button">
          <View style={styles.SwitchButtons}>
            <Text>Switch</Text>
          </View>
        <Text style={styles.SelectionText}>New Alter</Text></Pressable>
      </View>
      <View style={styles.SelectionView}>
        <Pressable 
            style={styles.SwitchPressable} 
            onPress={ () => {MakeUnknownFront()}}
            accessible={true} 
            accessibilityLabel="Switch to blurry or unknown"
            accessibilityHint="If you are not sure who you are, or are a mix of different people, tap here."
            accessibilityRole="button">
          <View style={styles.SwitchButtons}>
            <Text>Switch</Text>
          </View>
        <Text style={styles.SelectionText}>Blurry/Unknown</Text></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  SelectionView: {
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  SelectionText: {
    fontSize: 20,
    paddingLeft: 15,
  },
  SwitchButtons: {
    backgroundColor: 'aqua',
    height: 25,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SwitchPressable: {
    flexDirection: 'row',
  },
  NameErrorText: {
    color: 'red',
    paddingLeft: 50,
  },
})

export default SwitchMenuContents;