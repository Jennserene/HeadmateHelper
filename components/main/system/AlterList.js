import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'
import AlterSelection from './alter/AlterSelection';

const AlterList = (props) => {

  const context = useContext(Context)

  const { viewAlter } = props

  const printAlters = () => {
    return context.allAlters.map( (alter) => {
      if (alter !== 'Unknown') {
        return <AlterSelection key={`sel-${alter}`} alter={alter} viewAlter={viewAlter} />
      }
    })
  }

  return (
    <View style={styles.Container}>
      { printAlters() }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 10,
  }
})

export default AlterList;