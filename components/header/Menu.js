import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

const Menu = (props) => {
  return (
    <Pressable style={styles.menuButton} onPress={() => console.log('Menu button pressed')}>
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