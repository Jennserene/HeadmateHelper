import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

// This component is used in components/Header.js
const Menu = (props) => {

  const { toggleMainMenu } = props

  const MainToggle = () => {
    toggleMainMenu()
  }

  return (
    <Pressable 
        style={styles.menuButton} 
        onPress={() => MainToggle()}
        accessible={true} 
        accessibilityLabel="Main Menu"
        accessibilityHint="Opens up the Main menu"
        accessibilityRole='button'>
      <Image style={styles.menuImage} source={require("../../assets/logo.png")} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    height: "100%",
    width: "100%",
  },
  menuImage: {
    height: 75,
    width: 75,
  },
})

export default Menu;