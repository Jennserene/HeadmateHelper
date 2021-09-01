import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Context from '../../../Context'
// import ChatMsg from './ChatMsg'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

const ChatHistory = (props) => {

  const context = useContext(Context)

  const { roomID, newMsg } = props

  const [refreshing, setRefreshing] = useState(false)
  const [limit, setLimit] = useState(40)
  const [documentData, setDocumentData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastSnapShot, setLastSnapShot] = useState(null)

  // const messagesRef = context.db.collection("users").doc(contreatedAt', '>', lastMsgDateTiext.user.uid).collection('rooms').doc(roomID).collection('chats')
  // const query = messagesRef.orderBy('createdAt').limit(limit)
  // const [initMessages] = useCollectionData(query, { idField: 'id' })

  // useEffect( () => {
  //   if (initMessages) {
  //     setlastMsgDateTime(initMessages[initMessages.length -1].createdAt)
  //   }
  // }, [initMessages])

  // const printMsgs = () => {
  //   return messages.map( (msg) => {
  //     return <ChatMsg key={msg.id} message={msg} />
  //   })
  // }

  useEffect( () => {
    const addNewMsg = async () => {
      if (newMsg) {
        try {
          const dbMsg = await context.db.collection("users").doc(context.user.uid).collection('rooms').doc(roomID).collection('chats').doc(newMsg)
          const newData = await dbMsg.get().then(documentSnapshot => { // get document, THEN take snapshot of document
            if (documentSnapshot.exists) { // does document exist?
              return documentSnapshot.data()
            } else {
              return false
            }
          })
          if (documentData) {
            setDocumentData([...documentData, newData])
          } else {
            setDocumentData([newData])
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
    addNewMsg()
  }, [newMsg])

  useEffect( () => {
    // Retrieve Data
    retrieveData = async () => {
      try {
        // Set State: Loading
        setLoading(true)
        // console.log('Retrieving Data');
        // Cloud Firestore: Query
        const queryPath = await context.db.collection("users").doc(context.user.uid).collection('rooms').doc(roomID).collection('chats')
        let initialQuery = await queryPath
          // .where('id', '<=', 20)
          .orderBy('createdAt')
          .limitToLast(limit)
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery.get();
        // Cloud Firestore: Document Data
        let newDocumentData = documentSnapshots.docs.map((document) => {
          const docData = document.data()
          const docID = document.id
          const docObj = {id: docID, ...docData}
          return docObj
        });
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        if (newDocumentData.length > 0) {
          const docSnap = await queryPath.doc(newDocumentData[0].id).get()
          // Set State
          setDocumentData(newDocumentData)
          setLastSnapShot(docSnap)
        }
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
    };
    retrieveData()
  }, [])

  // Retrieve More
  const retrieveMore = async () => {
    if (documentData.length < 40) {return}
    try {
      // Set State: Refreshing
      setRefreshing(true)

      // console.log('Retrieving additional Data');
      // Cloud Firestore: Query (Additional Query)
      const queryPath = await context.db.collection("users").doc(context.user.uid).collection('rooms').doc(roomID).collection('chats')
      let additionalQuery = await queryPath
        .orderBy('createdAt', 'desc')
        .startAfter(lastSnapShot)
        .limit(limit)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();

      // Cloud Firestore: Document Data
      let newDocumentDataReversed = documentSnapshots.docs.map((document) => {
        const docData = document.data()
        const docID = document.id
        const docObj = {id: docID, ...docData}
        return docObj
      });
      let newDocumentData = newDocumentDataReversed.reverse()
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      if (newDocumentData.length > 0) {
        const docSnap = await queryPath.doc(newDocumentData[0].id).get()
        // Set State
        setDocumentData([...newDocumentData, ...documentData])
        setLastSnapShot(docSnap)
      }
      setRefreshing(false)

    }
    catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    try {
      // Check If Loading
      if (loading) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.ChatHistView}>
      {/* { messages && printMsgs() } */}
      <FlatList 
        data={documentData}
        renderItem={({ item }) => (
          <View style={styles.ContView}>
            <View style={styles.AvatarView}>

            </View>
            <View style={styles.TextView}>
              <View style={styles.HeaderView}>
                <Text style={styles.HeaderText}>{item.author}</Text>
              </View>
              <View style={styles.MsgView}>
                <Text>{item.text}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.FlatListContainer}
        inverted
        keyExtractor={(item, index) => String(index)} // Item Key
        onEndReached={() => {retrieveMore()}} // On End Reached (Takes a function)
        onEndReachedThreshold={1} // How Close To The End Of List Until Next Data Request Is Made
        refreshing={refreshing} // Refreshing (Set To True When End Reached)
        ListHeaderComponent={renderHeader} // Header (Activity Indicator)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ChatHistView: {
    alignItems: 'flex-end',
    width: '100%',
  },
  FlatListContainer: {
    flexDirection: 'column-reverse'
  },
  ContView: {
    flexShrink: 1,
    flexDirection: 'row',
    padding: 1,
    width: '100%',
  },
  AvatarView: {
    backgroundColor: 'purple',
    height: 40,
    width: 40,
  },
  TextView: {
    // flex: 1,
    flexDirection: 'column',
    width: '90%',

  },
  HeaderView: {
    flexShrink: 1,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  HeaderText: {
    fontWeight: 'bold'
  },
  MsgView: {
    flexShrink: 1,
    flexDirection: 'column',
    paddingLeft: 15,
  },
})

export default ChatHistory;