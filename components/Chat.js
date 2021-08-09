import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Chat = (props) => {

  return (
    <View style={styles.logInView}>
      <Text>Chat placeholder text</Text>
      <Text>{ props.initChatRoom }</Text>
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

export default Chat;