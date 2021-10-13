import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'
import {Picker} from '@react-native-picker/picker'

const SwitchMenuPicker = (props) => {

  const { handlePicker } = props

  const context = useContext(Context)

  const defaultFront = () => {
    if (context.front.name == 'Unknown') {
      return 'default'
    } else {
      return context.front.name
    }
  }

  const [selectedValue, setSelectedValue] = useState(defaultFront())

  const PopulatePicker = () => {
    if (context.allAlters == null) {
      return
    }
    return context.allAlters.map( (alter) => {
      if (alter.name !== 'Unknown') {
        return <Picker.Item key={alter.id} style={styles.Item} label={alter.name} value={alter.id} />
      }
    })
  }

  const PassUpPickedAlter = (alterID) => {
    setSelectedValue(alterID)
    handlePicker(alterID)
  }

  return (
    <View style={styles.Container}>
      <Picker
        selectedValue={selectedValue}
        style={styles.Picker}
        onValueChange={(itemValue) => PassUpPickedAlter(itemValue)}>
        <Picker.Item style={styles.Item} label="Pick an alter" value="default" />
        { PopulatePicker() }
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 5,
  },
  Picker: {
    height: 30,
    width: 250,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black',
    // paddingLeft: 15,
  },
  Item: {
    fontSize: 20,
  }
})

export default SwitchMenuPicker;