import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../Context'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import ViewSystem from './system/ViewSystem'

const System = (props) => {

  const context = useContext(Context)

  const [systemView, setSystemView] = useState('view')

  const documentRef = context.db.collection("users").doc(context.user.uid)
  const [systemData] = useDocumentData(documentRef, { idField: 'id' })

  console.log('DATA: ', systemData)

  return (
    <View style={styles.Container}>
      <View style={styles.SystemView}>
        {/* { systemView == 'view' && <ViewSystem systemData={systemData} /> } */}
        {/* { systemView == 'edit' && <EditSystem systemData={systemData} /> } */}
      </View>
      <View style={styles.AltersView}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {

  },
  SystemView: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  AltersView: {

  }
})

export default System;