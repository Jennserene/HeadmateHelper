import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import * as firebase from 'firebase'

const SignIn = (props) => {

  const [ emailText, setEmailText ] = useState('')
  const [ passwordText, setPasswordText ] = useState('')
  const [ errorCode, setErrorCode ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  const { toggleSigningUp } = props

  const handleEmailText = (text) => {
    setEmailText(text)
  }

  const handlePasswordText = (text) => {
    setPasswordText(text)
  }

  const handleSubmit = async () => {
    // VALIDATION HERE
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(emailText, passwordText)
      const user = userCredential.user
      setErrorCode('')
      setErrorMessage('')
    } catch (err) {
      setErrorCode(err.code)
      setErrorMessage(err.message)
    }
  }

  return (
    <View style={styles.ContainerView}>
      { errorMessage ? 
        <View>
          <Text>Error Code: {errorCode}</Text>
          <Text>{errorMessage}</Text>
        </View> : null}
      <View style={styles.EmailView}>
        <Text>Email Address:</Text>
        <TextInput
          style={styles.InputField}
          placeholder="Email"
          value={emailText}
          autoCompleteType='email'
          onChangeText={text => handleEmailText(text)}/>
      </View>
      <View style={styles.PasswordView}>
        <Text>Password:</Text>
        <TextInput
          style={styles.InputField}
          placeholder="Password"
          value={passwordText}
          autoCompleteType='password'
          secureTextEntry={true}
          onChangeText={text => handlePasswordText(text)}/>
      </View>
      <View style={styles.ButtonsView}>
        <Pressable onPress={ () => {toggleSigningUp()}}>
          <View style={styles.IndButtonView}>
            <Text>Sign Up</Text>
          </View>
        </Pressable>
        <Pressable onPress={ () => {handleSubmit()}}>
          <View style={styles.IndButtonView}>
            <Text>Log In</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerView: {
    // width: '100%'
  },
  EmailView: {

  },
  PasswordView: {

  },
  ButtonsView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  IndButtonView: {
    backgroundColor: 'aqua',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputField: {
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
  }
})

export default SignIn;