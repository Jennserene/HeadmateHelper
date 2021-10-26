// import react and react-native display components
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';

// import firebase
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'


// import Expo
import * as WebBrowser from 'expo-web-browser';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// import context
import Context from './Context'

// import components
import Header from './components/Header'
import LogIn from './components/LogIn'
import Main from './components/Main'
import LoadingScreen from './components/LoadingScreen'


// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(ApiKeys.FirebaseConfig);

WebBrowser.maybeCompleteAuthSession()

const App = () => {

  // create Database for queries in child components
  const db = firebase.firestore()

  // Set State
  const [user, setUser] = useState(null)
  const [accountInit, setAccountInit] = useState(false)
  const [front, setFront] = useState({name: 'Unknown', id: 'unknown', proxy: ''})
  const [switchMenuOpen, setSwitchMenuOpen] = useState(false)
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [allAlters, setAllAlters] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newAlterIntro, setNewAlterIntro] = useState('')
  const [settings, setSettings] = useState({introVisible: true})

  // Check if user is already logged in and then set them to user.
  useEffect( () => {
    try {
      firebase.auth().onAuthStateChanged( async (currUser) => {
        currUser ? setUser(currUser) : setUser(null) // is the user logged in? If so setUser to user
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  // Check if user account is logged in and set up state
  useEffect( () => {
    const checkIfLoggedIn = async () => {
      if (user) {
        setLoading(true)
        try {
          const dbUser = await db.collection("users").doc(user.uid)
          const init = await dbUser.get().then(documentSnapshot => { // get document, THEN take snapshot of document
            if (documentSnapshot.exists) { // does document exist?
              setNewAlterIntro(documentSnapshot.data().newAlterIntro)
              return documentSnapshot.data().accountInit.toString() // if exists return value for accountInit
            } else {
              setLoading(false)
              return false
            }
          })
          if (init === 'true') {
            setAccountInit(true) // If user account initialized, setAccountInit to true, otherwise set to false
            // Get list of all alters
            try {
              const querySnapshot = await dbUser.collection('alters').orderBy('lastFront', 'desc').get() // Get query of all alters
              let alterNames = [] // Holder of alters, contains many
              querySnapshot.forEach((doc) => {
                alterNames.push({ // Add alter info to array alterNames
                  name: doc.get('name'), 
                  id: doc.id, 
                  lastFront: doc.get('lastFront'),
                  proxy: doc.get('proxy'),
                }) 
              })
              setAllAlters(alterNames)
            } catch (err) {
              console.error(err)
            }
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
  }, [user]) // update on user being changed

  // if you are not logged in, your account can't be initialized
  useEffect( () => {
    const hideHeader = () => {
      !user && setAccountInit(false)
    }
    hideHeader()
  }, [user, accountInit]) // update every time user or accountInit changes

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
    setUser(null)
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
  const addAlter = (alter) => {
    let alters = allAlters
    alters.unshift(alter)
    setAllAlters(alters)
  }

  // Set alter as front
  const makeAlterFront = async (alterID) => {
    // const dbUser = await db.collection("users").doc(user.uid)
    // const querySnapshot = await dbUser.collection('alters').where('name', '==', alterName).get() // Get query of alters named alterName
    // let alterIDs = [] // Holder of IDs, should only contain 1 but can contain more just in case
    // let alterNames = [] // Holder of names, should only contain 1 but can contain more just in case
    // querySnapshot.forEach((doc) => {
    //   alterIDs.push(doc.id) // add ids of alters named alterName to array alterIDs
    //   alterNames.push(doc.get('name')) // add names of alters named alterName to array alterNames
    // })
    try {
      const dbUser = await db.collection("users").doc(user.uid).collection("alters").doc(alterID).update({
        lastFront: firebase.firestore.FieldValue.serverTimestamp()
      })
      const frontAlter = allAlters.find(alter => alter.id === alterID)
      setFront(frontAlter)
      let alters = allAlters
      const index = alters.indexOf(frontAlter)
      if (index > -1) {
        alters.splice(index, 1)
        alters.unshift(frontAlter)
        setAllAlters(alters)
      }
    } catch (err) {
      console.error(err)
    }
    // if (alterIDs.length == 1) {
      
    //   setFrontID(alterIDs[0]) // set front ID to alterName's ID
    //   setFrontName(alterNames[0]) // set front name to alterName's name
    // } else {
    //   console.error(`THERE ARE ${alterIDs.length} ALTERS NAMED ${alterName}`)
    // }
  }

  // Rename an alter
  const renameAlter = (newName) => {
    if (newName !== front.name) {
      for (let i = 0; i < allAlters.length; i++ ) {
        if (allAlters[i].id == front.id) {
          allAlters[i].name = newName
          setFront(allAlters[i])
          return
        }
      }
    }
  }

  const reproxyAlter = (newProxy) => {
    if (newProxy !== front.proxy) {
      for (let i = 0; i < allAlters.length; i++) {
        if (allAlters[i].id == front.id) {
          allAlters[i].proxy = newProxy
          setFront(allAlters[i])
          return
        }
      }
    }
  }

  const updateNewAlterIntro = (text) => {
    setNewAlterIntro(text)
  }

  return (
    <SafeAreaView style={styles.root}>
      <ExpoStatusBar style="dark" />
      <KeyboardAvoidingView
          behavior={'postion' || 'height' || 'padding'}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.KeyboardAvoidContainer}>
        { loading ? // if app is loading, display loading screen.
          <LoadingScreen /> :
          <Context.Provider value={{ // set global state
            user: user,
            db: db,
            front: front,
            allAlters: allAlters,
            settings: settings,
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
                                  renameAlter={renameAlter} 
                                  reproxyAlter={reproxyAlter} 
                                  newAlterIntro={newAlterIntro} 
                                  updateNewAlterIntro={updateNewAlterIntro} /> }
            </View>
          </Context.Provider>
        }
      </KeyboardAvoidingView>
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
  KeyboardAvoidContainer: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'android' ? Dimensions.get('window').height - StatusBar.currentHeight : '100%',
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
