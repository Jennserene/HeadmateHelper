import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './components/Header'
import LogIn from './components/LogIn'
import Main from './components/Main'
import LoadingScreen from './components/LoadingScreen'
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
  const [frontName, setFrontName] = useState('Unknown')
  const [frontID, setFrontID] = useState(null)
  const [switchMenuOpen, setSwitchMenuOpen] = useState(false)
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [allAlters, setAllAlters] = useState(null)
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in and then set them to loggedIn.
  useEffect( () => {
    try {
      firebase.auth().onAuthStateChanged( async (user) => {
        user ? setLoggedIn(user) : setLoggedIn(null) // is the user logged in? If so setLoggedIn to user
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  // Check if user account is logged in and set up state
  useEffect( () => {
    const checkIfLoggedIn = async () => {
      if (loggedIn) {
        setLoading(true)
        try {
          const dbUser = await db.collection("users").doc(loggedIn.uid)
          const init = await dbUser.get().then(documentSnapshot => { // get document, THEN take snapshot of document
            if (documentSnapshot.exists) { // does document exist?
              return documentSnapshot.data().accountInit.toString() // if exists return value for accountInit
            } else {
              setLoading(false)
              return false
            }
          })
          if (init === 'true') { // Set front to Unknown
            setAccountInit(true) // If user account initialized, setAccountInit to true, otherwise set to false
            const querySnapshot = await dbUser.collection('alters').where('name', '==', 'Unknown').get() // Get query of alters named Unknown
            let alterIDs = [] // Holder of IDs, should only contain 1 but can contain more just in case
            let alterNames = [] // Holder of names, should only contain 1 but can contain more just in case
            querySnapshot.forEach((doc) => {
              alterIDs.push(doc.id) // add ids of alters named Unknown to array alterIDs
              alterNames.push(doc.get('name')) // add names of alters named Unknown to array alterNames
            })
            if (alterIDs.length == 1) {
              setFrontID(alterIDs[0]) // set front ID to Unknown's ID
              setFrontName(alterNames[0]) // set front name to Unknown's name
            } else {
              console.error(`THERE ARE ${alterIDs.length} ALTERS NAMED UNKNOWN`) // Change this to match whoever should be front
            }
            // Get list of all alters
            const querySnapshot2 = await dbUser.collection('alters').get() // Get query of all alters
            let alterNames2 = [] // Holder of names, contains many
            querySnapshot2.forEach((doc) => {
              alterNames2.push(doc.get('name')) // Add names of alters to array alterNames2
            })
            setAllAlters(alterNames2)
            // Bring up switch menu right away
            setMainMenuOpen(false)
            setSwitchMenuOpen(true)
            setLoading(false)
          }
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }
      
    }
    checkIfLoggedIn()
  }, [loggedIn]) // update on loggedIn being changed

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
  useEffect( () => {
    const logInUsingGoogle = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        
        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebase.auth().signInWithCredential(credential);
        const user = await firebase.auth().currentUser
        setLoggedIn(user)
      }
    }
    logInUsingGoogle()
  }, [response]);

  // Initialize the account
  const initializeAccount = () => {
    setAccountInit(true)
    setMainMenuOpen(false)
    setSwitchMenuOpen(true)
  }

  // Log out of the account
  const logOut = () => {
    firebase.auth().signOut()
    setMainMenuOpen(false)
    setAccountInit(false)
    setLoggedIn(null)
  }

  // Toggle whether the switch menu is open or not
  const toggleSwitchMenu = () => {
    setSwitchMenuOpen(!switchMenuOpen)
    setMainMenuOpen(false)
  }

  // Toggle whether the main menu is open or not
  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen)
    setSwitchMenuOpen(false)
  }

  // Add alter to allAlters
  const addAlter = (alterName) => {
    let names = allAlters
    names.push(alterName)
    setAllAlters(names)
  }

  // Set alter as front
  const makeAlterFront = async (alterName) => {
    const dbUser = await db.collection("users").doc(loggedIn.uid)
    const querySnapshot = await dbUser.collection('alters').where('name', '==', alterName).get() // Get query of alters named alterName
    let alterIDs = [] // Holder of IDs, should only contain 1 but can contain more just in case
    let alterNames = [] // Holder of names, should only contain 1 but can contain more just in case
    querySnapshot.forEach((doc) => {
      alterIDs.push(doc.id) // add ids of alters named alterName to array alterIDs
      alterNames.push(doc.get('name')) // add names of alters named alterName to array alterNames
    })
    if (alterIDs.length == 1) {
      setFrontID(alterIDs[0]) // set front ID to alterName's ID
      setFrontName(alterNames[0]) // set front name to alterName's name
    } else {
      console.error(`THERE ARE ${alterIDs.length} ALTERS NAMED ${alterName}`)
    }
  }

  // Rename an alter
  const renameAlter = (newName) => {
    if (newName !== frontName) {
      for (let i = 0; i < allAlters.length; i++ ) {
        if (allAlters[i] == frontName) {
          allAlters[i] = newName
          setFrontName(newName)
          return
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ExpoStatusBar style="dark" />
      { loading ? // if app is loading, display loading screen.
        <LoadingScreen /> :
        <Context.Provider value={{ // set global state
          user: loggedIn,
          db: db,
          frontName: frontName,
          frontID: frontID,
          allAlters: allAlters,
        }}>
          <View style={styles.header}>
            {/* Header displays only if account is initialized */}
            { accountInit && <Header 
                                toggleSwitchMenu={toggleSwitchMenu} 
                                toggleMainMenu={toggleMainMenu} /> }
          </View>
          <View style={styles.mainContent}>
            {/* ROUTING HAPPENS HERE */}
            {/* If your account has not finished initializing display the logIn component */}
            { !accountInit && <LogIn
                                accountInit={accountInit} 
                                request={request} 
                                promptAsync={promptAsync} 
                                initializeAccount={initializeAccount} /> }
            {/* If your account has finished initializing display the Main component */}
            { accountInit && <Main 
                                switchMenuOpen={switchMenuOpen} 
                                mainMenuOpen={mainMenuOpen} 
                                toggleSwitchMenu={toggleSwitchMenu} 
                                toggleMainMenu={toggleMainMenu} 
                                addAlter={addAlter} 
                                makeAlterFront={makeAlterFront}
                                logOut={logOut} 
                                renameAlter={renameAlter} /> }
          </View>
        </Context.Provider>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#7252CA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 75,
    width: "100%",
    backgroundColor: '#50359A',
  },
  mainContent: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    // height: "100%",
    backgroundColor: '#7252CA',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App
