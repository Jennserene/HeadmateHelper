import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import Context from '../../Context'
import ViewSystem from './system/ViewSystem'
import EditSystem from './system/EditSystem'
import AlterList from './system/AlterList'
import Alter from './system/Alter'
import Intro from './system/Intro'

const System = (props) => {

  const context = useContext(Context)

  const { renameAlter, reproxyAlter, newAlterIntro, updateNewAlterIntro, updateLocalSystem, openDM } = props

  const [systemView, setSystemView] = useState('view')
  const [alterFocus, setAlterFocus] = useState(null)

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
        { (systemView == 'view') && <ViewSystem 
                                                    toggleSystemView={toggleSystemView} /> }
        { (systemView == 'edit') && <EditSystem 
                                                    toggleSystemView={toggleSystemView}
                                                    updateLocalSystem={updateLocalSystem} /> }
        { (systemView == 'alter') && <Alter 
                                      alter={alterFocus} 
                                      toggleSystemView={toggleSystemView} 
                                      renameAlter={renameAlter} 
                                      reproxyAlter={reproxyAlter} /> }
        { (systemView == 'intro') && <Intro 
                                        newAlterIntro={newAlterIntro} 
                                        updateNewAlterIntro={updateNewAlterIntro} 
                                        toggleSystemView={toggleSystemView} /> }
      </View>
      { (systemView == 'view' && context.allAlters) && 
        <ScrollView>
          <View style={styles.AltersView}>
            <AlterList viewAlter={viewAlter} openDM={openDM}/>
          </View>
        </ScrollView> }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {

  },
  SystemView: {
    
  },
  AltersView: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: 'black',
  }
})

export default System;