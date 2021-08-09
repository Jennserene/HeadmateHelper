import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const LogIn = (props) => {

  return (
    <View style={styles.logInView}>
      <Text>Log-in Placeholder text</Text>
      <Text>{props.loggedIn ? "True" : "False"}, {props.accountInit ? "True" : "False"}</Text>
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