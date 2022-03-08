import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { firebaseSignUp } from '../../Firebase'

// This component is used in components/LogIn/Authenticate.js
const SignUp = (props) => {

  const [ emailText, setEmailText ] = useState('')
  const [ passwordText, setPasswordText ] = useState('')
  const [ repeatPasswordText, setRepeatPasswordText ] = useState('')
  const [ repeatError, setRepeatError ] = useState('')
  const [ errorCode, setErrorCode ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  const { toggleSigningUp } = props

  const handleEmailText = (text) => {
    setEmailText(text)
  }

  const handlePasswordText = (text) => {
    setPasswordText(text)
  }

  const handleRepeatPasswordText = (text) => {
    setRepeatPasswordText(text)
  }

  const handleSubmit = async () => {
    setErrorCode('')
    setErrorMessage('')
    // VALIDATION HERE
    if (passwordText !== repeatPasswordText) {
      setRepeatError('Password and Repeat Password must be identical')
      return
    }
    const user = await firebaseSignUp(emailText, passwordText)
    if (!user.uid) {
      setErrorCode(user.code)
      setErrorMessage(user.msg)
    }
  }

  return (
    <View>
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
      <View style={styles.PasswordView}>
        <Text>Repeat Password:</Text>
        <TextInput
          style={styles.InputField}
          placeholder="Password... again"
          value={repeatPasswordText}
          autoCompleteType='password'
          secureTextEntry={true}
          onChangeText={text => handleRepeatPasswordText(text)}/>
        { repeatError ? <Text>{repeatError}</Text> : null}
      </View>
      <View style={styles.ButtonsView}>
        <Pressable onPress={ () => {toggleSigningUp()}}>
          <View style={styles.IndButtonView}>
            <Text>Go Back</Text>
          </View>
        </Pressable>
        <Pressable onPress={ () => {handleSubmit()}}>
          <View style={styles.IndButtonView}>
            <Text>Sign Up</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  InputField: {
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
  }
})

export default SignUp;