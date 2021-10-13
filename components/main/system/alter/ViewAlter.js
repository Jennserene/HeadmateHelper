import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import Context from '../../../../Context'

const ViewAlter = (props) => {

  const context = useContext(Context)

  const { alterData, toggleSystemView, toggleAlterView } = props

  const handleGoBack = () => {
    toggleSystemView('view')
  }

  const handleEdit = () => {
    toggleAlterView('edit')
  }

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContentView}>
        <View style={styles.ContentRowView}>
          <View style={styles.LeftView}>
            <Text style={styles.ContentText}>Name: {alterData.name}</Text>
            { alterData.proxy ? <Text style={styles.ContentText}>Proxy: {alterData.proxy}</Text> : null }
            { alterData.age ? <Text style={styles.ContentText}>Age: {alterData.age}</Text> : null }
            { alterData.birthday ? <Text style={styles.ContentText}>Birthday: {alterData.birthday}</Text> : null }
            { alterData.arrivalDay ? <Text style={styles.ContentText}>Arrival Day: {alterData.arrivalDay}</Text> : null }
            { alterData.species ? <Text style={styles.ContentText}>Species: {alterData.species}</Text> : null }
          </View>
          <View style={styles.RightView}>

          </View>
        </View>
        { alterData.sexuality ? <Text style={styles.ContentText}>Sexuality: {alterData.sexuality}</Text> : null }
        { alterData.gender ? <Text style={styles.ContentText}>Gender: {alterData.gender}</Text> : null }
        { alterData.fusionOf ? <Text style={styles.ContentText}>Fusion Of: {alterData.fusionOf}</Text> : null }
        { alterData.roles ? 
          <View>
            <Text style={styles.ContentText}>Roles:</Text>
            <Text style={styles.MultiText}> {alterData.roles}</Text>
          </View> : null }
        { alterData.tells ? 
          <View>
            <Text style={styles.ContentText}>Tells:</Text>
            <Text style={styles.MultiText}> {alterData.tells}</Text>
          </View> : null }
        { alterData.triggers ? 
          <View>
            <Text style={styles.ContentText}>Triggers:</Text>
            <Text style={styles.MultiText}> {alterData.triggers}</Text>
          </View> : null }
        { alterData.aboutMe ? 
          <View>
            <Text style={styles.ContentText}>About Me:</Text>
            <Text style={styles.MultiText}> {alterData.aboutMe}</Text>
          </View> : null }
        { alterData.appearance ? 
          <View>
            <Text style={styles.ContentText}>Appearance:</Text>
            <Text style={styles.MultiText}> {alterData.appearance}</Text>
          </View> : null }
        { alterData.relationships ? 
          <View>
            <Text style={styles.ContentText}>Relationships:</Text>
            <Text style={styles.MultiText}> {alterData.relationships}</Text>
          </View> : null }
      </View>
      <View style={styles.ButtonsView}>
        <Pressable style={styles.ButtonsPressable} onPress={ () => {handleGoBack()}}>
          <Text>Go Back</Text>
        </Pressable>
        { context.front.id == alterData.id ? 
        <Pressable style={styles.ButtonsPressable} onPress={ () => {handleEdit()}}>
          <Text>Edit</Text>
        </Pressable> : <Text>This Alter must be front to edit</Text> }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'column'
  },
  ContentView: {
    flexDirection: 'column',
    padding: 10,
  },
  ContentRowView: {
    flexDirection: 'row'
  },
  LeftView: {
    width: '50%',
  },
  RightView: {
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
  },
  ContentText: {
    paddingTop: 5,
  },
  MultiText: {
    paddingLeft: 30
  },
  ButtonsView: {
    flexDirection: 'row',
    padding: 10,
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

export default ViewAlter;