import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import Context from '../../../../Context'
import { updateAlter } from '../../../../Firebase';
import AlterField from './AlterField'

const EditAlter = (props) => {

  const context = useContext(Context)

  const { alterData, toggleAlterView, renameAlter, reproxyAlter, handleAlterData } = props

  const [alterObj, setAlterObj] = useState({...alterData})
  const [nameError, setNameError] = useState(null)

  const fields = [
    {label: 'Name', fieldName: 'name', multiline: false},
    {label: 'Proxy', fieldName: 'proxy', multiline: false},
    {label: 'Pronouns', fieldName: 'pronouns', multiline: false},
    {label: 'Age', fieldName: 'age', multiline: false},
    {label: 'Birthday', fieldName: 'birthday', multiline: false},
    {label: 'Arrival Day', fieldName: 'arrivalDay', multiline: false},
    {label: 'Species', fieldName: 'species', multiline: false},
    {label: 'Sexuality', fieldName: 'sexuality', multiline: false},
    {label: 'Gender', fieldName: 'gender', multiline: false},
    {label: 'Roles', fieldName: 'roles', multiline: true},
    {label: 'Tells', fieldName: 'tells', multiline: true},
    {label: 'Triggers', fieldName: 'triggers', multiline: true},
    {label: 'About Me', fieldName: 'aboutMe', multiline: true},
    {label: 'Fusion Of', fieldName: 'fusionOf', multiline: false},
    {label: 'Appearance', fieldName: 'appearance', multiline: true},
    {label: 'Relationships', fieldName: 'relationships', multiline: true},
  ]

  const handleFieldUpdate = (field, value) => {
    let altObj = {...alterObj}
    altObj[field] = value
    setAlterObj(altObj)
  }

  const printInputFields = () => {
    return fields.map( (field) => {
      return <AlterField 
              key={field.fieldName}
              label={field.label} 
              fieldName={field.fieldName} 
              content={alterObj[field.fieldName]} 
              multi={field.multiline}
              handleFieldUpdate={handleFieldUpdate}
              nameError={nameError} />
    })
  }

  const handleGoBack = () => {
    toggleAlterView('view')
  }

  const handleNameValidation = () => {
    if (alterObj.name !== context.front.name) {
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

  const renameAlterInDMs = () => {
    // Rename alter in local DMs
    // Rename alter in DMs in firestore
  }
  
  const handleSubmit = async () => {
    const nameValidated = handleNameValidation() // Check if name is blank or a duplicate
    if (!nameValidated) {return} // If name fails validation then exit function
    // Handle submit
    await updateAlter(alterData.id, alterObj)
    if (alterObj.name !== context.front.name) {
      renameAlter(alterObj.name)
      renameAlterInDMs(alterObj.id, alterObj.name)
    }
    if (alterObj.proxy !== context.front.proxy) {
      reproxyAlter(alterObj.proxy)
    }
    setNameError('')
    handleAlterData(alterObj)
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