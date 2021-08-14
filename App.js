import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './components/Header'
import LogIn from './components/LogIn'
import Chat from './components/Chat'
import Context from './Context'

// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(ApiKeys.FirebaseConfig);

WebBrowser.maybeCompleteAuthSession()

const App = () => {

  // create Database for queries in child components
  const db = firebase.firestore()

  // Set State
  const [loggedIn, setLoggedIn] = useState(null)
  const [accountInit, setAccountInit] = useState(true)
  const [page, setPage] = useState("chat")

  // Check if user account is logged in
  useEffect( () => {
    const checkIfLoggedIn = () => {
      try {
        firebase.auth().onAuthStateChanged( async (user) => {
          user ? setLoggedIn(user.uid) : setLoggedIn(null) // is the user logged in? If so setLoggedIn to user uid
          const init = await db.collection("users").doc(user.uid).get().then(documentSnapshot => { // get document, THEN take snapshot of document
            if (documentSnapshot.exists) { // does document exist?
              return documentSnapshot.data().accountInit // if exists return value for accountInit
            } else {
              return false
            }
          })
          setAccountInit(init) // If user account initialized, setAccountInit to true, otherwise set to false
        })
      } catch (error) {
        console.error(error)
      }
      
    }
    checkIfLoggedIn()
  }, []) // update on mount

  // if you are not logged in, your account can't be initialized
  useEffect( () => {
    const hideHeader = () => {
      !loggedIn && setAccountInit(false)
    }
    hideHeader()
  }, [loggedIn, accountInit]) // update every time loggedIn or accountInit changes

  // LOGIN WITH GOOGLE
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '967966221796-n6j2t7vutdgglv42lhmnguau9qrp9f8f.apps.googleusercontent.com',
      },
  );
  useEffect(() => {
    if (response?.type === 'success') {
      console.log('IN APP SIGNIN USEEFFECT, RESPONSE TYPE == SUCCESS')
      const { id_token } = response.params;
      
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
      const user = firebase.auth().currentUser
      setLoggedIn(user.uid)
    }
  }, [response]);

  // Initialize the account
  const initializeAccount = () => {
    setAccountInit(true)
  }

  return (
    <SafeAreaView style={styles.root}>
      <ExpoStatusBar style="dark" />
      <Context.Provider value={{
        userUID: loggedIn,
        db: db
      }}>
        <View style={styles.header}>
          {/* Header displays only if account is initialized */}
          { accountInit && <Header /> }
        </View>
        <View style={styles.main}>
          {/* ROUTING HAPPENS HERE */}
          {/* If your account has not finished initializing display the logIn component */}
          { !accountInit && <LogIn
                              accountInit={accountInit} 
                              request={request} 
                              promptAsync={promptAsync} 
                              initializeAccount={initializeAccount} />}
          {/* If your account has finished initializing display the page stored in 'page' */}
          { (accountInit && (page == "chat")) && <Chat initChatRoom="main" />}
        </View>
      </Context.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 75,
    width: "100%",
    backgroundColor: "dodgerblue",
  },
  main: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "tomato",
  },
});

export default App
