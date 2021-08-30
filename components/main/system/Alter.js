import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import ViewAlter from './alter/ViewAlter'
import EditAlter from './alter/EditAlter'

const Alter = (props) => {

  const context = useContext(Context)

  const { alter, toggleSystemView, renameAlter } = props

  const [alterView, setAlterView] = useState('view')

  const documentRef = context.db.collection("users").doc(context.user.uid).collection("alters").doc(alter[1])
  const [alterData] = useDocumentData(documentRef, { idField: 'id' })

  const toggleAlterView = (page) => {
    setAlterView(page)
  }

  return (
    <View>
      { (alterView == 'view' && alterData) && <ViewAlter 
                                                  alterData={alterData} 
                                                  toggleSystemView={toggleSystemView} 
                                                  toggleAlterView={toggleAlterView} /> }
      { (alterView == 'edit' && alterData) && <EditAlter 
                                                  alterData={alterData} 
                                                  toggleAlterView={toggleAlterView} 
                                                  renameAlter={renameAlter} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  
})

export default Alter;