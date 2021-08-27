import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const SwitchMenuContents = (props) => {

  // Switch to New Alter menu
  const ToggleMenuState = () => {
    props.menuStateToggle()
  }

  // Close the menu
  const SwitchToggle = () => {
    props.toggleSwitchMenu()
  }

  return (
    <View>
      <Text style={styles.HeaderText}>Who is Front?</Text>
      <View style={styles.SelectionView}>
        <Pressable style={styles.SwitchButtons}>
          <Text>Switch</Text></Pressable>
        <Text style={styles.SelectionText}>Alter Picker</Text>
      </View>
      <View style={styles.SelectionView}>
        <Pressable style={styles.SwitchButtons} onPress={ () => {ToggleMenuState()}}>
          <Text>Switch</Text></Pressable>
        <Text style={styles.SelectionText}>New Alter</Text>
      </View>
      <View style={styles.SelectionView}>
        <Pressable style={styles.SwitchButtons}>
          <Text>Switch</Text></Pressable>
        <Text style={styles.SelectionText}>Blurry/Unknown</Text>
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
    flexDirection: 'row'
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
})

export default SwitchMenuContents;