import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './header/Menu'
import Switch from './header/Switch'
import Context from '../Context'

const Header = () => {

  const context = useContext(Context)

  return (
    <View style={styles.header}>
      {/* MENU BUTTON */}
      <View style={styles.menuArea}>
        <Menu />
      </View>
      {/* TITLE AREA - SHOWS WHO IS FRONT */}
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Front: {context.frontName}</Text>
      </View>
      {/* SWITCH BUTTON */}
      <View style={styles.switchArea}>
        <Switch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    height: "100%",
    justifyContent: "space-between"
  },
  menuArea: {
    height: 75,
    width: 75,
    backgroundColor: "purple", // TESTING BG COLOR
  },
  switchArea: {
    height: "100%",
    width: 100,
    backgroundColor: "green" // TESTING BG COLOR
  },
  titleArea: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "gray", // TESTING BG COLOR
    flexShrink: 1,
    paddingLeft: 5,
  },
  titleText: {
    fontSize: 20,
  }
})

export default Header;
