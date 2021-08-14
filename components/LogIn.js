import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Authenticate from './LogIn/Authenticate'
import CreateSystem from './LogIn/CreateSystem'

const LogIn = (props) => {

  return (
    <View style={styles.logInView}>
      { !props.loggedIn && <Authenticate request={props.request} promptAsync={props.promptAsync} /> }
      { (props.loggedIn && !props.accountInit) && <CreateSystem initializeAccount={props.initializeAccount} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  logInView: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
})

export default LogIn;