import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

// This component is used in App.js
const LoadingScreen = (props) => {
  return (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size='large' color='black' />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  LoadingContainer: {
    backgroundColor: '#7252CA',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LoadingScreen;