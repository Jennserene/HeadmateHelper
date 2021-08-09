import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './components/Header'
import LogIn from './components/LogIn'
import Chat from './components/Chat'


const App = () => {

  const [loggedIn, setLoggedIn] = useState(true)
  const [accountInit, setAccountInit] = useState(true)
  const [page, setPage] = useState("chat")

  useEffect( () => {
    // if you are not logged in, your account can't be initialized
    const hideHeader = () => {
      !loggedIn && setAccountInit(false)
    }
    hideHeader()
  }, [loggedIn, accountInit]) // update every time loggedIn or accountInit changes

  return (
    <SafeAreaView style={styles.root}>
      <ExpoStatusBar style="dark" />
      <View style={styles.header}>
        {/* Header displays only if account is initialized */}
        { accountInit && <Header /> }
      </View>
      <View style={styles.main}>
        {/* ROUTING HAPPENS HERE */}
        {/* If your account has not finished initializing display the logIn component */}
        { !accountInit && <LogIn loggedIn={loggedIn} accountInit={accountInit} />}
        {/* If your account has finished initializing display the page stored in 'page' */}
        { (accountInit && (page == "chat")) && <Chat initChatRoom="main" />}
      </View>
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
