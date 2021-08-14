import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

const Switch = (props) => {
  return (
    <Pressable style={styles.switchButton} onPress={() => console.log('Switch button pressed')}>
      <Text style={styles.switchButtonText}>Switch</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchButton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  switchButtonText: {
    fontSize: 20,
  },
})

export default Switch;