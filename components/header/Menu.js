import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

const Menu = (props) => {

  const { toggleMainMenu } = props

  const MainToggle = () => {
    toggleMainMenu()
  }

  return (
    <Pressable style={styles.menuButton} onPress={() => MainToggle()}>
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