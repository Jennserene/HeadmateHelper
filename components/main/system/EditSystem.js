import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'
import SystemField from './SystemField'

const EditSystem = (props) => {

  const context = useContext(Context)

  const { systemData, toggleSystemView } = props

  const [systemObj, setSystemObj] = useState({...systemData})

  const fields = [ // All the editable fields in System Profile
    // field[0] = label, field[1] = fieldName, field[2] = multiline
    ['System Name', 'systemName', false],
    ['Public Name', 'publicName', false],
    ['Legal Name', 'legalName', false],
    ['Body Conditions', 'conditions', true],
    ['Relationships', 'relationships', true],
  ]

  const handleFieldUpdate = (field, value) => {
    let sysObj = {...systemObj}
    sysObj[field] = value
    setSystemObj(sysObj)
  }

  const printInputFields = () => {
    return fields.map( (field) => {
      return <SystemField 
              key={field[1]}
              label={field[0]} 
              fieldName={field[1]} 
              content={systemObj[field[1]]} 
              multi={field[2]}
              handleFieldUpdate={handleFieldUpdate} />
    })
  }

  const handleGoBack = () => {
    toggleSystemView('view')
  }

  const handleSubmit = async () => {
    // Replace with updateSystem(systemObj) from ../../../Firebase.js
    const dbSystem = await context.db.collection('users').doc(context.user.uid).update(systemObj)
    toggleSystemView('view')
  }

  return (
    <View style={styles.Container}>
      <View style={styles.ButtonsView}>
        <Pressable style={styles.ButtonsPressable} onPress={ () => {handleGoBack()}}>
          <Text>Go Back</Text>
        </Pressable>
        <Pressable style={styles.ButtonsPressable} onPress={ () => {handleSubmit()}}>
          <Text>Submit</Text>
        </Pressable>
      </View>
      <View>
      { printInputFields() }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  ButtonsView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  ButtonsPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default EditSystem;