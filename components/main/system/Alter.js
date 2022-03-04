import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'
import ViewAlter from './alter/ViewAlter'
import EditAlter from './alter/EditAlter'
import { getAlter } from '../../../Firebase';

const Alter = (props) => {

  const context = useContext(Context)

  const { alter, toggleSystemView, renameAlter, reproxyAlter } = props

  const [alterView, setAlterView] = useState('view')
  const [alterData, setAlterData] = useState(null)

  useEffect( () => {
    const retrieveAlterData = async () => {
      const alterDoc = await getAlter(alter.id)
      setAlterData(alterDoc)
    }
    retrieveAlterData()
  }, [])

  // If front changes while editing, return to view
  useEffect( () => {
    const watchForFrontChange = () => {
      if (alter.id == context.front.id) {return} // if ID did not change, don't change alterView
      setAlterView('view')
    }
    watchForFrontChange()
  }, [context.front.id])

  const toggleAlterView = (page) => {
    setAlterView(page)
  }

  const handleAlterData = (alterObj) => {
    setAlterData(alterObj)
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
                                                  renameAlter={renameAlter} 
                                                  reproxyAlter={reproxyAlter}
                                                  handleAlterData={handleAlterData} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  
})

export default Alter;