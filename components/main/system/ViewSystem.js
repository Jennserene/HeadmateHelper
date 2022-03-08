import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../../Context'

// This component is used in components/main/System.js
const ViewSystem = (props) => {

  const context = useContext(Context)

  const { toggleSystemView } = props

  const [systemData, setSystemData] = useState(context.system)

  return (
    <View>
      <View style={styles.HeaderView}>
        <Text style={styles.HeaderText}>{systemData.systemName}</Text>
      </View>
      <View style={styles.ContentView}>
        <View style={styles.LeftView}>
          { systemData.publicName ? <Text>Public name: {systemData.publicName}</Text> : null }
          { systemData.legalName ? <Text>Legal name: {systemData.legalName}</Text> : null }
          { systemData.conditions ? <View>
                                      <Text>Body Conditions: </Text>
                                      <Text style={styles.IndentedText}>{systemData.conditions}</Text>
                                    </View> : null}
          { systemData.relationships ? <View>
                                      <Text>Relationships: </Text>
                                      <Text style={styles.IndentedText}>{systemData.relationships}</Text>
                                    </View> : null}
        </View>
        <View style={styles.RightView}>
          <Text># Registered Alters: {context.allAlters.length - 1}</Text>
          {/* Add body age. But how? */}
        </View>
      </View>
      <View style={styles.ButtonsView}>
        <View>
          { context.settings.introVisible ? 
            <Pressable style={styles.IntroButtonPressable} onPress={ () => {toggleSystemView('intro')}}>
              <Text>New Alter Intro</Text>
            </Pressable> 
          : null }
        </View>
        <Pressable style={styles.EditButtonPressable} onPress={ () => {toggleSystemView('edit')}}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    width: '100%',
    alignItems: 'center',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  ContentView: {
    flexDirection: 'row',
    padding: 10,
  },
  LeftView: {
    borderColor: 'black',
    borderRightWidth: 1,
    borderStyle: 'solid',
    width: '50%'
  },
  RightView: {
    paddingLeft: 10,
  },
  IndentedText: {
    paddingLeft: 30,
  },
  ButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  EditButtonPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IntroButtonPressable: {
    backgroundColor: 'aqua',
    height: 25,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ViewSystem;