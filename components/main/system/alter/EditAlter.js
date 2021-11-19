import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import Context from '../../../../Context'
import AlterField from './AlterField'

const EditAlter = (props) => {

  const context = useContext(Context)

  const { alterData, toggleAlterView, renameAlter, reproxyAlter } = props

  const [alterObj, setAlterObj] = useState({...alterData})
  const [nameError, setNameError] = useState(null)

  const fields = [ // All the editable fields in Alter Profile
    // field[0] = label, field[1] = fieldName, field[2] = multiline
    ['Name', 'name', false],
    ['Proxy', 'proxy', false],
    ['Age', 'age', false],
    ['Birthday', 'birthday', false],
    ['Arrival Day', 'arrivalDay', false],
    ['Species', 'species', false],
    ['Sexuality', 'sexuality', false],
    ['Gender', 'gender', false],
    ['Roles', 'roles', true],
    ['Tells', 'tells', true],
    ['Triggers', 'triggers', true],
    ['About Me', 'aboutMe', true],
    ['Fusion Of', 'fusionOf', false],
    ['Appearance', 'appearance', true],
    ['Relationships', 'relationships', true],
  ]

  const handleFieldUpdate = (field, value) => {
    let altObj = {...alterObj}
    altObj[field] = value
    setAlterObj(altObj)
  }

  const printInputFields = () => {
    return fields.map( (field) => {
      return <AlterField 
              key={field[1]}
              label={field[0]} 
              fieldName={field[1]} 
              content={alterObj[field[1]]} 
              multi={field[2]}
              handleFieldUpdate={handleFieldUpdate}
              nameError={nameError} />
    })
  }

  const handleGoBack = () => {
    toggleAlterView('view')
  }

  // const getAlterList = () => {
  //   return context.allAlters.map( (alter) => {
  //     if (alter !== context.frontName) {
  //       return alter
  //     }
  //   })
  // }

  const handleNameValidation = () => {
    if (alterObj.name !== context.frontName) {
      if (alterObj.name == '') {
        console.log('name is blank')
        setNameError('Alter name can not be blank')
        return false
      }
      if (context.allAlters.indexOf(alterObj.name) !== -1) {
        setNameError('An alter by that name already exists')
        return false
      }
    }
    return true
  }
  
  const handleSubmit = async () => {

    const nameValidated = handleNameValidation() // Check if name is blank or a duplicate
    if (!nameValidated) { // If name fails validation then exit function
      return
    }
    
    // Handle submit
    // Replace with updateAlter(alterID, alterObj) from ../../../../Firebase.js
    const dbalter = await context.db.collection('users').doc(context.user.uid).collection('alters').doc(alterData.id).update(alterObj)
    if (alterObj.name !== context.front.name) {
      renameAlter(alterObj.name)
    }
    if (alterObj.proxy !== context.front.proxy) {
      reproxyAlter(alterObj.proxy)
    }
    setNameError('')
    toggleAlterView('view')
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
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
        <View style={styles.ButtonsView}>
          <Pressable style={styles.ButtonsPressable} onPress={ () => {handleGoBack()}}>
            <Text>Go Back</Text>
          </Pressable>
          <Pressable style={styles.ButtonsPressable} onPress={ () => {handleSubmit()}}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
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

export default EditAlter;