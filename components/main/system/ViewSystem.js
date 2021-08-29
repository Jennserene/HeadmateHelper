import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'

const ViewSystem = (props) => {

  const { systemData } = props
  const { systemName } = systemData

  console.log('IN VIEWSYSTEM')

  return (
    <View>
      <View style={styles.HeaderView}>
        <Text>{systemName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    width: '100%',
    alignItems: 'center',
  },
})

export default ViewSystem;