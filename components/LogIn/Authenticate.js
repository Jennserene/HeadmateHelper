import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Authenticate = (props) => {

  const [ signingUp, setSigningUp ] = useState(false)

  const { handleLogIn } = props

  const toggleSigningUp = () => {
    setSigningUp(!signingUp)
  }

  return (
    <View style={styles.ContainerView}>
      { !signingUp && <SignIn 
                        toggleSigningUp={toggleSigningUp} 
                        handleLogIn={handleLogIn} /> }
      { signingUp && <SignUp 
                        toggleSigningUp={toggleSigningUp} 
                        handleLogIn={handleLogIn} /> }
    </View>
  )
}

const styles = StyleSheet.create({
  ContainerView: {
    width: '70%',
  },
})

export default Authenticate