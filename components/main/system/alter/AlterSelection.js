import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../../Context'

const AlterSelection = (props) => {

  const context = useContext(Context)

  const { alter, viewAlter } = props

  const [alterID, setAlterID] = useState(alter.id)

  const handleView = () => {
    viewAlter(alter)
  }

  return (
    <View style={styles.Container}>
      <Pressable style={styles.ButtonsPressable} onPress={ () => {handleView()}}>
        <Text>View Profile</Text>
      </Pressable>
      <Text style={styles.AlterText}>{alter.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },
  ButtonsPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AlterText: {
    paddingLeft: 10,
  }
})

export default AlterSelection;