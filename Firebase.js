import ApiKeys from './constants/ApiKeys'
import { initializeApp } from 'firebase/app' // THEN:
// Initialize Firebase
initializeApp(ApiKeys.FirebaseConfig);

import { 
          getFirestore, 
          doc, 
          getDoc, 
          addDoc, 
          collection, 
          getDocs, 
          query, 
          updateDoc, 
          serverTimestamp,
          setDoc,
          onSnapshot,
          deleteDoc,
          orderBy,
          limit,
        } from "firebase/firestore"
import { 
          getAuth, 
          onAuthStateChanged, 
          signInWithEmailAndPassword, 
          createUserWithEmailAndPassword, 
          signOut 
        } from "firebase/auth"

const db = getFirestore()

const auth = getAuth()
let userUID = ''

onAuthStateChanged(auth, (user => {
  if (user) {
    userUID = user.uid // Get user's UID
  }
}))

// used in ./App.js on user state change
export const getSystemData = async () => {
  try {
    const sysRef = doc(db, "users", userUID)
    const docSnap = await getDoc(sysRef)
    if (docSnap.exists()) {
      // docSnap.data() contains: newAlterIntro, settings, accountInit, and systemName and more
      const sysData = docSnap.data()
      const sysObj = {
        id: userUID,
        ...sysData,
      }
      return sysObj
    } else {
      console.log('ERROR in getSystemData: Account data does not exist!')
    }
  } catch (err) {
    console.log('ERROR in getSystemData:', err)
  }
}

// used in ./App.js on user state change
export const getAllAlters = async () => { // Can this contain ALL alter data? Perhaps convert alterList to an object... Would that maintain order by lastFront?
  try {
    const altersRef = collection(db, `users/${userUID}/alters`)
    const q = query(altersRef, orderBy('lastFront', 'desc'))
    const querySnapshot = await getDocs(q)
    let alterList = []
    querySnapshot.forEach((doc) => {
      const alterObj = doc.data()
      alterList.push({ // Add alter info to array alterList
        name: alterObj.name, 
        id: doc.id, 
        lastFront: alterObj.lastFront,
        proxy: alterObj.proxy,
      })
    })
    return alterList
  } catch (err) {
    console.log('ERROR in getAllAlters:', err)
  }
}

// used in ./App.js in makeAlterFront()
export const updateAlterFront = async (alterID) => {
  try {
    const frontRef = doc(db, `users/${userUID}/alters/${alterID}`)
    await updateDoc(frontRef, {
      lastFront: serverTimestamp()
    })
  } catch (err) {
    console.log('ERROR in updateAlterFront:', err)
  }
}

// used in ./App.js in logOut()
export const firebaseLogOut = async () => {
  try {
    signOut(auth)
  } catch (err) {
    console.log('ERROR in firebaseLogOut: ', err)
  }
}

// used in ./components/Main.js on mount
export const getAllRooms = async () => {
  try {
    const roomsRef = collection(db, `users/${userUID}/rooms`)
    const q = query(roomsRef, orderBy('createdAt'))
    const querySnapshot = await getDocs(q)
    let roomData = []
    querySnapshot.forEach((doc) => {
      const roomObj = doc.data()
      roomData.push({
        name: roomObj.roomName,
        id: doc.id,
      })
    })
    return roomData
  } catch (err) {
    console.log('ERROR in getAllRooms:', err)
  }
}

// used in ./components/Login/CreateSystem.js in SubmitSystem()
export const putInitSystemData = async (systemName) => {
  try {
    // Create doc with user's UID with two fields in it
    const acctRef = doc(db, 'users', userUID)
    await setDoc(acctRef, {
      systemName: systemName,
      accountInit: true,
    })
    // create 'alters' collection inside user doc
    const unknownAlterRef = doc(db, `users/${userUID}/alters`, 'unknown')
    await setDoc(unknownAlterRef, {
      name: 'Unknown',
      lastFront: serverTimestamp()
    })
    // create 'rooms' collection inside user doc
    await addDoc(collection(db, `users/${userUID}/rooms`), {
      roomName: 'Main',
      createdAt: serverTimestamp()
    })
  } catch (err) {
    console.log('ERROR in putInitSystemData:', err)
  }
}

// used in ./components/LogIn/SignIn.js
export const firebaseLogIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
  } catch (err) {
    const errorObj = {
      code: err.code,
      msg: err.message,
    }
    return errorObj
  }
}

// used in ./components/LogIn/SignUp.js
export const firebaseSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
  } catch (err) {
    const errorObj = {
      code: err.code,
      msg: err.message,
    }
    return errorObj
  }
}

// used in ./components/main/Settings.js in handleSave()
export const updateSettings = async (settingsData) => {
  try {
    const userRef = doc(db, 'users', userUID)
    await updateDoc(userRef, {
      settings: settingsData
    })
  } catch (err) {
    console.log('ERROR in updateSettings:', err)
  }
}

// used in ./components/main/chat/ChatHistory.js in addNewMsg() CONSIDER CONVERTING TO SNAPSHOT
export const getNewMsg = async (roomID, newMsg) => {
  try {
    const msgRef = doc(db, `users/${userUID}/rooms/${roomID}/chats`, newMsg)
    const newMsgData = await getDoc(msgRef)
    if (newMsgData.exists()) {
      return newMsgData.data()
    } else {
      return false
    }
  } catch (err) {
    console.log('ERROR in getNewMsg:', err)
  }
}

// used in ./components/main/chat/ChatHistory.js in retrieveData()
export const getInitChatQuery = async (roomID, limitNum) => {
  try {
    const chatsRef = collection(db, `users/${userUID}/rooms/${roomID}/chats`)
    const q = query(chatsRef, orderBy('createdAt'), limit(limitNum))
    const querySnapshot = await getDocs(q)
    let newChatData = []
    querySnapshot.forEach((doc) => {
      docData = doc.data()
      newChatData.push({
        id: doc.id,
        ...docData,
      })
    })
    return newChatData // Can get ID of last visible document by accessing newChatData[0].id
  } catch (err) {
    console.log('ERROR in getInitChatQuery:', err)
  }
}

// used in ./components/main/chat/ChatHistory.js in retrieveMore()
export const getMoreChatQuery = async (roomID, limitNum, lastSnapShot) => {
  try {
    const chatsRef = collection(db, `users/${userUID}/rooms/${roomID}/chats`)
    const q = query(chatsRef, orderBy('createdAt', 'desc'), limit(limitNum), startAfter(lastSnapShot))
    const querySnapshot = await getDocs(q)
    let newChatDataBackwards = []
    querySnapshot.forEach((doc) => {
      docData = doc.data()
      newChatDataBackwards.push({
        id: doc.id,
        ...docData,
      })
    })
    const newChatData = newChatDataBackwards.reverse()
    return newChatData // Can get ID of last visible document by accessing newChatData[0].id
  } catch (err) {
    console.log('ERROR in getMoreChatQuery:', err)
  }
}

// used in ./components/main/chat/ChatHistory.js in retrieveData() and retrieveMore()
export const getLastChatSnapShot = async (roomID, lastDocID) => {
  try {
    const chatRef = doc(db, `users/${userUID}/rooms/${roomID}/chats`, lastDocID)
    const docSnap = await getDoc(chatRef)
    if (docSnap.exists()) {
      return docSnap
    } else {
      console.log('ERROR in getLastChatSnapShot: docSnap does not exist!')
    }
  } catch (err) {
    console.log('ERROR in getLastChatSnapShot: ', err)
  }
}

// used in ./components/main/chat/NewMsgField.js in SubmitMsg()
export const putNewMsg = async (roomID, newMsgRaw) => {
  try {
    const newMsg = {
      ...newMsgRaw,
      createdAt: serverTimestamp(),
    }
    const chatsRef = collection(db, `users/${userUID}/rooms/${roomID}/chats`)
    const docRef = await addDoc(chatsRef, newMsg)
    return docRef.id
  } catch (err) {
    console.log('ERROR in putNewMsg: ', err)
  }
}

// used in ./components/main/managerooms/EditRooms.js in handleSubmit()
export const putNewRoom = async (newRoomName) => {
  try {
    const newRoom = {
      roomName: newRoomName,
      createdAt: serverTimestamp()
    }
    const roomsRef = collection(db, `users/${userUID}/rooms`)
    const docSnap = await addDoc(roomsRef, newRoom)
    return docSnap.id
  } catch (err) {
    console.log('ERROR in putNewRoom:', err)
  }
}

// used in ./components/main/managerooms/SingleRoom.js in handleDelete()
export const deleteRoom = async (roomID) => {
  try {
    const roomRef = doc(db, `users/${userUID}/rooms`, roomID)
    await deleteDoc(roomRef)
  } catch (err) {
    console.log('ERROR in deleteRoom:', err)
  }
}

// used in ./components/main/managerooms/SingleRoom.js in handleSubmit()
export const updateRoomName = async (roomID, roomName) => {
  try {
    const roomRef = doc(db, `users/${userUID}/rooms`, roomID)
    await updateDoc(roomRef, {
      roomName: roomName,
    })
  } catch (err) {
    console.log('ERROR in updateRoomName:', err)
  }
}

// used in ./components/main/switchmenu/SwitchMenuNewAlter.js in SubmitAlter()
export const putNewAlter = async (name, proxy) => {
  try {
    const altersRef = collection(db, `users/${userUID}/alters`)
    const docRef = await addDoc(altersRef, {
      name: name,
      proxy: proxy,
      createdAt: serverTimestamp()
    })
    return docRef.id
  } catch (err) {
    console.log('ERROR in putNewAlter:', err)
  }
}

// used in ./components/main/system/Alter.js on mount // Can this just be gotten from allAlters in app.js?
export const getAlter = async (alterID) => {
  try {
    const alterRef = doc(db, `users/${userUID}/alters`, alterID)
    const alterSnap = await getDoc(alterRef)
    if (alterSnap.exists()) {
      const alterData = alterSnap.data()
      const alterObj = {
        id: alterID,
        ...alterData,
      }
      return alterObj
    } else {
      console.log('ERROR in getAlter: Document does not exist!')
    }
  } catch (err) {
    console.log('ERROR in getAlter:', err)
  }
}

// used in ./components/main/system/EditSystem.js in handleSubmit()
export const updateSystem = async (systemObj) => {
  try {
    const sysRef = doc(db, 'users', userUID)
    await updateDoc(sysRef, systemObj)
  } catch (err) {
    console.log('ERROR in updateSystem:', err)
  }
}

// used in ./components/main/system/Intro.js in saveContents()
export const updateFBNewAlterIntro = async (introContents) => {
  try {
    const sysRef = doc(db, 'users', userUID)
    await updateDoc(sysRef, {
      newAlterIntro: introContents
    })
  } catch (err) {
    console.log('ERROR in updateFBNewAlterIntro:', err)
  }
}

// used in ./components/main/system/alter/EditAlter.js in handleSubmit()
export const updateAlter = async (alterID, alterObj) => {
  try {
    const alterRef = doc(db, `users/${userUID}/alters`, alterID)
    await updateDoc(alterRef, alterObj)
  } catch (err) {
    console.log('ERROR in updateAlter:', err)
  }
}