import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.menuArea}>
        <TouchableHighlight style={styles.switchButton} onPress={() => console.log('Menu button pressed')}>
          <Image style={styles.menuImage} source={require("../assets/logo.png")} />
        </TouchableHighlight>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Front: Unknown</Text>
      </View>
      <View style={styles.switchArea}>
        <TouchableHighlight style={styles.switchButton} onPress={() => console.log('Switch button pressed')}>
          <Text style={styles.switchButtonText}>Switch</Text>
        </TouchableHighlight>
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
    backgroundColor: "purple",
  },
  menuImage: {
    height: 75,
    width: 75,
  },
  menuButton: {
    height: "100%",
    width: "100%",
  },
  switchArea: {
    height: "100%",
    width: 100,
    backgroundColor: "green"
  },
  switchButton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  switchButtonText: {
    fontSize: 20,
  },
  titleArea: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "gray",
    flexShrink: 1,
    paddingLeft: 5,
  },
  titleText: {
    fontSize: 20,
  }
})

export default Header;
