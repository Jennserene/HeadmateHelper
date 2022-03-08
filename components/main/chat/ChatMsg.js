import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';

// Not used in any component, perhaps this should be used in ChatHistory.js
const ChatMsg = (props) => {

  const { text, author } = props.message

  return (
    <View style={styles.ContView}>
      <View style={styles.AvatarView}>

      </View>
      <View style={styles.TextView}>
        <View style={styles.HeaderView}>
          <Text style={styles.HeaderText}>{author}</Text>
        </View>
        <View style={styles.MsgView}>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContView: {
    flexShrink: 1,
    flexDirection: 'row',
    padding: 1,
  },
  AvatarView: {
    backgroundColor: 'purple',
    height: 40,
    width: 40,
  },
  TextView: {
    flex: 1,
    flexDirection: 'column',
  },
  HeaderView: {
    flexShrink: 1,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  HeaderText: {
    fontWeight: 'bold'
  },
  MsgView: {
    flexShrink: 1,
    flexDirection: 'column',
    paddingLeft: 15,
  },
})


export default ChatMsg;