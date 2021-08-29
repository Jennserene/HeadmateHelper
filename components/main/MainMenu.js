import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import MainMenuLeft from './mainmenu/MainMenuLeft'
import MainMenuRight from './mainmenu/MainMenuRight'

const MainMenu = (props) => {

  const { toggleMainMenu, systemName, logOut, handleNav, allRooms, handleRoomChange } = props

  // Close the switch menu
  const MainToggle = () => {
    toggleMainMenu()
  }

  return (
    <View style={styles.ContainerView}>
      <View style={styles.MenuView}>
        <View style={styles.HeaderView}>
          <Text>{systemName}</Text>
        </View>
        <View style={styles.MenuContentsView}>
          <View style={styles.LeftMenuView}>
            <MainMenuLeft 
              logOut={logOut}
              handleNav={handleNav} 
              toggleMainMenu={toggleMainMenu} />
          </View>
          <View style={styles.RightMenuView}>
            <MainMenuRight 
            allRooms={allRooms}
            handleRoomChange={handleRoomChange} 
            toggleMainMenu={toggleMainMenu} />
          </View>
        </View>
      </View>
      <Pressable style={styles.ClickOutPressable} onPress={ () => MainToggle()}>
        <View style={styles.ClickOutView} />
      </Pressable>
    </View>
  );
};

export default MainMenu

const styles = StyleSheet.create({
  ContainerView: {
    flex: 1,
    width: '100%'
  },
  MenuView: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  HeaderView: {
    alignItems: 'center',
    padding: 10,
  },
  MenuContentsView: {
    flexDirection: 'row',
    padding: 10,
  },
  LeftMenuView: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderStyle: 'solid',
    width: '40%',
  },
  RightMenuView: {
    paddingLeft: 10,
  },
  ClickOutView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%',
    width: '100%',
  },
  ClickOutPressable: {
    height: '100%',
    width: '100%',
  }
})