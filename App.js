// import react and react-native display components
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, Dimensions, LogBox } from 'react-native';

// import firebase
import { getSystemData, getAllAlters, updateAlterFront, firebaseLogOut } from './Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"


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




WebBrowser.maybeCompleteAuthSession()

const App = () => {

  // WARNING SUPPRESSED! THIS SHOULD BE REMOVED AND THE WARNING FIXED
  LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core'])

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
  const [system, setSystem] = useState(null)

  // // Check if user is already logged in and then set them to user
  useEffect( () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user => {
      if (user) {
        setUser(user.uid) // Get user's UID
      } else {
        setUser(null)
      }
    }))
  }, [])

  // Check if user account is logged in and set up state
  useEffect( () => {
    const checkIfLoggedIn = async () => {
      if (user) {
        setLoading(true)
        try {
          const sysObj = await getSystemData()
          setSystem(sysObj)
          if (newAlterIntro in sysObj) {
            setNewAlterIntro(sysObj.newAlterIntro)
          }
          // check if settings object exists and if so handle defaults one by one
          let tempSettings = {}
          if ('settings' in sysObj) {
            tempSettings = sysObj.settings
            // SETTINGS DEFAULTS IF SETTINGS EXISTS
            // Enables adding new settings in the future without having to manually change settings on back end
            if (!("introVisible" in tempSettings)) { // if key 'introVisible' does not exist then set it to false
              tempSettings.introVisible = false
            }
          } else { // If settings object does not exist, add default settings all at once.
            tempSettings = {
              introVisible: false,
            }
          }
          setSettings(tempSettings)
          if (sysObj.accountInit) {
            setAccountInit(true)
            const alterList = await getAllAlters()
            setAllAlters(alterList)
          }

          // Bring up switch menu right away
          setMainMenuOpen(false)
          setSwitchMenuOpen(true)
          setLoading(false)
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
    setAllAlters([{name: 'Unknown', id: 'unknown'}])
    setMainMenuOpen(false)
    setSwitchMenuOpen(true)
  }

  // Log out of the account
  const logOut = () => {
    firebaseLogOut()
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
  const makeAlterFront = (alterID) => {
    updateAlterFront(alterID) // Update who is front on firebase backend
    const frontAlter = allAlters.find(alter => alter.id === alterID)
    setFront(frontAlter)
    let alters = allAlters
    const index = alters.indexOf(frontAlter)
    if (index > -1) {
      alters.splice(index, 1)
      alters.unshift(frontAlter)
      setAllAlters(alters)
    }
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

  const updateLocalSettings = (settingsObj) => {
    setSettings(settingsObj)
  }

  const updateLocalSystem = (systemObj) => {
    setSystem(systemObj)
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
            system: system,
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
                                  updateNewAlterIntro={updateNewAlterIntro} 
                                  updateLocalSettings={updateLocalSettings}
                                  updateLocalSystem={updateLocalSystem} /> }
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
