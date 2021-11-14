import React, {useState, useContext} from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../../Context'

const Settings = (props) => {
  
  const context = useContext(Context)

  const [introVisible, setIntroVisible] = useState(context.settings.introVisible)
  const [saved, setSaved] = useState(true)

  const { updateSettings } = props

  const handleSave = () => {
    const tempSettings = {
      introVisible: introVisible,
    }
    try {
      context.db.collection('users').doc(context.user.uid).update({ // Update the settings field with new settings object
        settings: tempSettings
      })
      updateSettings(tempSettings)
      setSaved(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.containerView}>
      <View style={styles.headerView}>
        <Pressable 
            style={styles.SaveButton} 
            onPress={ () => {handleSave()}}
            accessible={true} 
            accessibilityLabel="Save the settings"
            accessibilityRole="button">
          <View>
            <Text>Save</Text>
          </View>
        </Pressable>
        { saved ? <Text>Saved!</Text> : <Text>Not saved!</Text>}
      </View>
      <ScrollView>
        <View style={styles.OptionView}>
          <Text>Make new alter introduction visible</Text>
          <Pressable
              style={styles.ToggleButton}
              onPress={ () => {setIntroVisible(!introVisible); setSaved(false)}}
              accessible={true} 
              accessibilityLabel="Toggle New Alter Intro visibility"
              accessibilityRole="button">
            { introVisible ? <Text>On</Text> : <Text>Off</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {

  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SaveButton: {
    margin: 5,
    backgroundColor: 'aqua',
    height: 25,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  ToggleButton: {
    backgroundColor: 'aqua',
    height: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Settings;