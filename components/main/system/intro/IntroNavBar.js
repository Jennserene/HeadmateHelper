import React from 'react';
import { Pressable, Text, StyleSheet, View, Linking } from 'react-native';

const IntroNavBar = (props) => {

  const { introNav, saveContents, handleIntroNav, introStatus, toggleSystemView } = props

  return (
    <View style={styles.NavBarContainer}>
      { introNav == ('view' || 'explain') && <Pressable 
                                                style={styles.Buttons} 
                                                onPress={ () => {handleIntroNav('edit')}}
                                                accessible={true} 
                                                accessibilityLabel="Go back to the edit screen"
                                                accessibilityRole="button">
        <View>
          <Text>Go Back</Text>
        </View>
      </Pressable> }
      { introNav == ('edit') && <Pressable 
                                                style={styles.Buttons} 
                                                onPress={ () => {toggleSystemView('view')}}
                                                accessible={true} 
                                                accessibilityLabel="Go back to the edit screen"
                                                accessibilityRole="button">
        <View>
          <Text>Go Back</Text>
        </View>
      </Pressable> }
      { introNav == 'edit' && <Pressable 
                                style={styles.Buttons} 
                                onPress={ () => { Linking.openURL('https://www.markdownguide.org/basic-syntax/')}}
                                accessible={true} 
                                accessibilityLabel="View an explanation of Markdown"
                                accessibilityRole="button">
        <View>
          <Text>Markdown</Text>
        </View>
      </Pressable> }
      { introNav == 'edit' && <Pressable 
                                style={styles.Buttons} 
                                onPress={ () => {handleIntroNav('view')}}
                                accessible={true} 
                                accessibilityLabel="Preview what the intro page looks like"
                                accessibilityRole="button">
        <View>
          <Text>Preview</Text>
        </View>
      </Pressable> }
      <View style={styles.Status}>
        <Text>{introStatus}</Text>
      </View>
      { introNav == 'edit' && <Pressable 
                                style={styles.Buttons} 
                                onPress={ () => {saveContents()}}
                                accessible={true} 
                                accessibilityLabel="Go back to the edit screen"
                                accessibilityRole="button">
        <View>
          <Text>Save</Text>
        </View>
      </Pressable> }
    </View>
  );
};

export default IntroNavBar;

const styles = StyleSheet.create({
  NavBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  Status: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Buttons: {
    backgroundColor: 'aqua',
    height: 25,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  }
})