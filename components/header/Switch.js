import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const Switch = (props) => {

  const { toggleSwitchMenu } = props

  const SwitchToggle = () => {
    toggleSwitchMenu()
  }

  return (
    <View>
      <Pressable 
          style={styles.switchButton} 
          onPress={() => SwitchToggle()} 
          accessible={true} 
          accessibilityLabel="Switch"
          accessibilityHint="Opens up the Switch menu"
          accessibilityRole='button'>
        <Text style={styles.switchButtonText}>Switch</Text>
      </Pressable>
    </View>

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