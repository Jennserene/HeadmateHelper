import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../../Context'

const AlterSelection = (props) => {

  const context = useContext(Context)

  const { alter, viewAlter, openDM } = props

  const [alterID, setAlterID] = useState(alter.id)

  const handleView = () => {
    viewAlter(alter)
  }

  const handleOpenDM = async () => {
    await openDM([context.front, alter])
  }

  return (
    <View style={styles.Container}>
      <Pressable style={styles.ViewProfPressable} onPress={ () => {handleView()}}>
        <Text>View Profile</Text>
      </Pressable>
      <Pressable style={styles.DMPressable} onPress={ () => {handleOpenDM()}}>
        <Text>DM</Text>
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
  ViewProfPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DMPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  AlterText: {
    paddingLeft: 10,
  }
})

export default AlterSelection;