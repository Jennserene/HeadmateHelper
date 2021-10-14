import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import Context from '../../Context'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import ViewSystem from './system/ViewSystem'
import EditSystem from './system/EditSystem'
import AlterList from './system/AlterList'
import Alter from './system/Alter'

const System = (props) => {

  const context = useContext(Context)

  const { renameAlter } = props

  const [systemView, setSystemView] = useState('view')
  const [alterFocus, setAlterFocus] = useState(null)

  const documentRef = context.db.collection("users").doc(context.user.uid)
  const [systemData] = useDocumentData(documentRef, { idField: 'id' })

  // console.log('DATA: ', systemData)

  const toggleSystemView = (page) => {
    setSystemView(page)
  }

  const viewAlter = (alter) => {
    setAlterFocus(alter)
    toggleSystemView('alter')
  }

  return (
    <View style={styles.Container}>

      <View style={styles.SystemView}>
        { (systemView == 'view' && systemData) && <ViewSystem 
                                                    systemData={systemData} 
                                                    toggleSystemView={toggleSystemView} /> }
        { (systemView == 'edit' && systemData) && <EditSystem 
                                                    systemData={systemData} 
                                                    toggleSystemView={toggleSystemView} /> }
        { (systemView == 'alter') && <Alter 
                                      alter={alterFocus} 
                                      toggleSystemView={toggleSystemView} 
                                      renameAlter={renameAlter} /> }
      </View>
      { (systemView == 'view' && context.allAlters) && 
        <ScrollView>
          <View style={styles.AltersView}>
            <AlterList viewAlter={viewAlter}/>
          </View>
        </ScrollView> }
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