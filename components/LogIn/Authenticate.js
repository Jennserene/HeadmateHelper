import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const Authenticate = (props) => {
  return (
    <Pressable
      disabled={!props.request}
      onPress={() => {
        props.promptAsync()
      }}
    >
      <View style={styles.GoogleLogInButton}>
        <Text>Sign In With Google</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  GoogleLogInButton: {
    height: 25,
    width: 100,
    backgroundColor: "teal"
  }
})

export default Authenticate