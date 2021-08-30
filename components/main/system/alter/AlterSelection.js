import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../../Context'

const AlterSelection = (props) => {

  const context = useContext(Context)

  const { alter, viewAlter } = props

  const [alterID, setAlterID] = useState(null)

  const handleView = () => {
    viewAlter([alter, alterID])
  }

  useEffect( () => {
    const getAlterID = async () => {
      const dbUser = await context.db.collection("users").doc(context.user.uid)
      const querySnapshot = await dbUser.collection('alters').where('name', '==', alter).get() // Get query of alters named alter
      let alterIDs = [] // Holder of IDs, should only contain 1 but can contain more just in case
      querySnapshot.forEach((doc) => {
        alterIDs.push(doc.id) // add ids of alters named alter to array alterIDs
      })
      if (alterIDs.length == 1) {
        setAlterID(alterIDs[0]) // set alterID to alterName's ID
      } else {
        console.error(`THERE ARE ${alterIDs.length} ALTERS NAMED ${alterName}`)
      }
    }
    getAlterID()
  }, [])

  return (
    <View style={styles.Container}>
      <Pressable style={styles.ButtonsPressable} onPress={ () => {handleView()}}>
        <Text>View Profile</Text>
      </Pressable>
      <Text style={styles.AlterText}>{alter}</Text>
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