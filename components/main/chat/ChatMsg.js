import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';


const ChatMsg = (props) => {

  const { text, author } = props.message

  return (
    <View style={styles.ContView}>
      <View style={styles.AvatarView}>

      </View>
      <View style={styles.TextView}>
        <View style={styles.HeaderView}>
          <Text>{author}</Text>
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
    backgroundColor: 'green',
  },
  HeaderView: {
    flexShrink: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  MsgView: {
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow',
  }
})


export default ChatMsg;