import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import SwitchMenuContents from './switchmenu/SwitchMenuContents'
import SwitchMenuNewAlter from './switchmenu/SwitchMenuNewAlter'

const SwitchMenu = (props) => {

  const [menuState, setMenuState] = useState('choose')

  // Close the switch menu
  const SwitchToggle = () => {
    props.toggleSwitchMenu()
  }

  // Toggle between the Switch menu and the New Alter menu
  const menuStateToggle = () => {
    if (menuState == 'choose') {
      setMenuState('new')
    } else if (menuState == 'new') {
      setMenuState('choose')
    }
  }

  return (
    <View style={styles.ContainerView}>
      <View style={styles.MenuView}>
        { menuState == 'choose' && <SwitchMenuContents 
                                      menuStateToggle={menuStateToggle} 
                                      toggleSwitchMenu={props.toggleSwitchMenu} /> }
        { menuState == 'new' && <SwitchMenuNewAlter 
                                  menuStateToggle={menuStateToggle} 
                                  toggleSwitchMenu={props.toggleSwitchMenu}
                                  addAlter={props.addAlter} /> }
      </View>
      <Pressable style={styles.ClickOutPressable} onPress={ () => SwitchToggle()}>
        <View style={styles.ClickOutView} />
      </Pressable>
    </View>
  );
};

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

export default SwitchMenu;