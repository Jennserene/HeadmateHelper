import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view'

// This component is used in components/main/SwitchMenu.js
const SwitchMenuIntro = (props) => {

  const { toggleSwitchMenu, newAlterIntro } = props

  const SwitchToggle = () => {
    toggleSwitchMenu()
  }

  return (
    <ScrollView style={styles.ContainerView}>
      <View style={styles.ChildContainerView}>
        <MarkdownView style={styles.IntroContainer}>
          { newAlterIntro }
        </MarkdownView>
        <Pressable 
            style={styles.ClickOutPressable}
            onPress={ () => SwitchToggle()}
            accessible={true} 
            accessibilityLabel="Exit switch menu"
            accessibilityHint="Tap here to exit the switch menu."
            accessibilityRole="button">
          <View style={styles.ClickOutView} >
            <Text>Close</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ContainerView: {
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
  },
  ChildContainerView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  IntroContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  ClickOutPressable: {
    padding: 10
  },
  ClickOutView: {
    backgroundColor: 'aqua',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SwitchMenuIntro;