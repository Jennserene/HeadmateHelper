import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../../Context'

const AlterSelection = (props) => {

  const context = useContext(Context)

  const { alter, viewAlter, openDM } = props

  const handleView = () => {
    viewAlter(alter)
  }

  const handleOpenDM = async () => {
    if (context.front.id == alter.id) {
      await openDM([context.front])
      return
    }
    await openDM([context.front, alter])
  }

  const shouldDMBeAvail = () => {
    // if (alter.id == context.front.id) {
    //   return false
    // }
    if (context.front.id == 'unknown') {
      return false
    }
    return true
  }

  const DMorSelf = () => {
    if (alter.id == context.front.id) {
      return false
    }
    return true
  }

  return (
    <View style={styles.Container}>
      <Pressable style={styles.ViewProfPressable} onPress={ () => {handleView()}}>
        <Text>View Profile</Text>
      </Pressable>
      <View style={styles.DMContainer}>
        { shouldDMBeAvail() && <Pressable style={styles.DMPressable} onPress={ () => {handleOpenDM()}}>
          { DMorSelf() ? <Text>DM</Text> : <Text>Self</Text> }
        </Pressable>}
      </View>
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
    
  },
  DMContainer: {
    marginLeft: 10,
    width: 40
  },
  AlterText: {
    paddingLeft: 10,
  }
})

export default AlterSelection;