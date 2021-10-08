import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Authenticate = (props) => {

  const [ signingUp, setSigningUp ] = useState(false)

  const { request, promptAsync, handleLogIn } = props

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
      <Pressable
          disabled={!request}
          onPress={() => {promptAsync()}}
          accessible={true} 
          accessibilityLabel="Sign in with Google"
          accessibilityRole='button'>
        <View style={styles.GoogleLogInButton}>
          <Text>Sign In With Google</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  ContainerView: {
    width: '70%',
  },
  GoogleLogInButton: {
    marginTop: 20,
    height: 25,
    width: 150,
    alignItems: 'center',
    backgroundColor: "aqua", // TESTING BG COLOR
    alignSelf: 'center',
  },
})

export default Authenticate