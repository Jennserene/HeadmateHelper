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
import Main from './components/Main'
import Context from './Context'

// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(ApiKeys.FirebaseConfig);

WebBrowser.maybeCompleteAuthSession()

const App = () => {

  // create Database for queries in child components
  const db = firebase.firestore()

  // Set State
  const [loggedIn, setLoggedIn] = useState(null)
  const [accountInit, setAccountInit] = useState(false)
  const [nav, setNav] = useState("chat")
  const [frontName, setFrontName] = useState('Unknown')
  const [frontID, setFrontID] = useState(null)

  // Check if user account is logged in
  useEffect( () => {
    const checkIfLoggedIn = () => {
      try {
        firebase.auth().onAuthStateChanged( async (user) => {
          user ? setLoggedIn(user) : setLoggedIn(null) // is the user logged in? If so setLoggedIn to user uid
          const dbUser = await db.collection("users").doc(user.uid)
          const init = await dbUser.get().then(documentSnapshot => { // get document, THEN take snapshot of document
            if (documentSnapshot.exists) { // does document exist?
              return documentSnapshot.data().accountInit // if exists return value for accountInit
            } else {
              return false
            }
          })
          if (init) {
            setAccountInit(init) // If user account initialized, setAccountInit to true, otherwise set to false
            const querySnapshot = await dbUser.collection('alters').where('name', '==', 'Unknown').get() // Get query of alters named Unknown
            const alterIDs = [] // Holder of IDs, should only contain 1 but can contain more just in case
            const alterNames = [] // Holder of names, should only contain 1 but can contain more just in case
            querySnapshot.forEach((doc) => {
              alterIDs.push(doc.id) // add ids of alters named Unknown to array
              alterNames.push(doc.get('name')) // add names of alters named Unknown to array
            })
            if (alterIDs.length == 1) {
              setFrontID(alterIDs[0]) // set front ID to Unknown's ID
              setFrontName(alterNames[0]) // set front name to Unknown's name
            } else {
              console.error(`THERE ARE ${alterIDs.length} ALTERS NAMED UNKNOWN`) // Change this to match whoever should be front
            }
          }
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
      <Context.Provider value={{ // set global state
        user: loggedIn,
        db: db,
        frontName: frontName,
        frontID: frontID,
      }}>
        <View style={styles.header}>
          {/* Header displays only if account is initialized */}
          { accountInit && <Header /> }
        </View>
        <View style={styles.mainContent}>
          {/* ROUTING HAPPENS HERE */}
          {/* If your account has not finished initializing display the logIn component */}
          { !accountInit && <LogIn
                              accountInit={accountInit} 
                              request={request} 
                              promptAsync={promptAsync} 
                              initializeAccount={initializeAccount} />}
          {/* If your account has finished initializing display the Main component */}
          { accountInit && <Main nav={nav} />}
        </View>
      </Context.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'grey', // TESTING BG COLOR
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 75,
    width: "100%",
    backgroundColor: "dodgerblue", // TESTING BG COLOR
  },
  mainContent: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    // height: "100%",
    backgroundColor: "tomato", // TESTING BG COLOR
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App
