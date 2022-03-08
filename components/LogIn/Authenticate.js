import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import SignIn from './SignIn'
import SignUp from './SignUp'

// This component is used in components/LogIn.js
const Authenticate = (props) => {

  const [ signingUp, setSigningUp ] = useState(false)

  const toggleSigningUp = () => {
    setSigningUp(!signingUp)
  }

  return (
    <View style={styles.ContainerView}>
      { !signingUp && <SignIn 
                        toggleSigningUp={toggleSigningUp} /> }
      { signingUp && <SignUp 
                        toggleSigningUp={toggleSigningUp} /> }
    </View>
  )
}

const styles = StyleSheet.create({
  ContainerView: {
    width: '70%',
  },
})

export default Authenticate