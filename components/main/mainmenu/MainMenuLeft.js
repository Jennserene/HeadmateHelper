import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const MainMenuLeft = (props) => {

  const { logOut, handleNav } = props

  // Replace with firebaseLogOut() from ../../../Firebase.js
  const handleLogOut = () => {
    logOut()
  }

  return (
    <View style={styles.Container}>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleNav('system')}}
            accessible={true} 
            accessibilityLabel="View System Profile"
            accessibilityRole="button">
          <Text style={styles.LinkText}>System Profile</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleNav('reminders')}}
            accessible={true} 
            accessibilityLabel="View Reminders"
            accessibilityRole="button">
          <Text style={styles.LinkText}>Reminders</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleNav('diary')}}
            accessible={true} 
            accessibilityLabel="View Diary"
            accessibilityRole="button">
          <Text style={styles.LinkText}>Diary</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleNav('settings')}}
            accessible={true} 
            accessibilityLabel="View Settings"
            accessibilityRole="button">
          <Text style={styles.LinkText}>Settings</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleNav('about')}}
            accessible={true} 
            accessibilityLabel="View About Page"
            accessibilityRole="button">
          <Text style={styles.LinkText}>About</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable 
            onPress={ () => {handleLogOut()}}
            accessible={true} 
            accessibilityLabel="Logout"
            accessibilityHint="Tap here to log out of your account."
            accessibilityRole="button">
          <Text style={styles.LinkText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%'
  },
  LinkView: {
    paddingBottom: 10,
  },
  LinkText: {
    fontSize: 15,
  },
})

export default MainMenuLeft;