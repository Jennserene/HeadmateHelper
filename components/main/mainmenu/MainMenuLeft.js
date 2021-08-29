import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const MainMenuLeft = (props) => {

  const { logOut, handleNav } = props

  const handleLogOut = () => {
    logOut()
  }

  return (
    <View style={styles.Container}>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleNav('system')}}>
          <Text style={styles.LinkText}>System Profile</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleNav('reminders')}}>
          <Text style={styles.LinkText}>Reminders</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleNav('diary')}}>
          <Text style={styles.LinkText}>Diary</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleNav('settings')}}>
          <Text style={styles.LinkText}>Settings</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleNav('about')}}>
          <Text style={styles.LinkText}>About</Text>
        </Pressable>
      </View>
      <View style={styles.LinkView}>
        <Pressable onPress={ () => {handleLogOut()}}>
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