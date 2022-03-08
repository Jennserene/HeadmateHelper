import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Authenticate from './LogIn/Authenticate'
import CreateSystem from './LogIn/CreateSystem'
import Context from '../Context'

// This component is used in App.js
const LogIn = (props) => {

  const context = useContext(Context)

  return (
    <View style={styles.logInView}>
      { !context.user && <Authenticate /> }
      { context.user && <CreateSystem initializeAccount={props.initializeAccount} /> }
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