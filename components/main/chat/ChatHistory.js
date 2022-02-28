import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Context from '../../../Context'
import { getNewMsg, getInitChatQuery, getMoreChatQuery, getLastChatSnapShot } from '../../../Firebase'

const ChatHistory = (props) => {

  const context = useContext(Context)
  const flatlistRef = useRef()

  const { roomID, newMsg } = props

  const [refreshing, setRefreshing] = useState(false)
  const [limit, setLimit] = useState(30)
  const [documentData, setDocumentData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastSnapShot, setLastSnapShot] = useState(null)

  useEffect( () => {
    const addNewMsg = async () => {
      if (newMsg) {
        // trimLength()
        flatlistRef.current.scrollToOffset({animating: true, offset: 0})
        const msg = await getNewMsg(roomID, newMsg)
        if (documentData) {
          setDocumentData([msg, ...documentData])
        } else {
          setDocumentData([msg])
        }
      }
    }
    addNewMsg()
  }, [newMsg])

  useEffect( () => {
    setDocumentData(null)
    // Retrieve Data
    retrieveData = async () => {
      setLoading(true)
      const chatData = await getInitChatQuery(roomID, limit)
      // const chatData = reversedChatData.reverse()
      if (chatData.length > 0) {
        const lastChatSnap = await getLastChatSnapShot(roomID, chatData[chatData.length - 1].id)
        setDocumentData(chatData)
        setLastSnapShot(lastChatSnap)
      }
      setLoading(false)
    };
    retrieveData()
  }, [roomID])

  // Retrieve More
  const retrieveMore = async () => {
    if (documentData.length < limit) {return}
    // console.log('Retrieving more chat data')
    setRefreshing(true)
    const moreChatDataReversed = await getMoreChatQuery(roomID, limit, lastSnapShot)
    const moreChatData = moreChatDataReversed.reverse()
    if (moreChatData.length > 0) {
      const lastChatSnap = await getLastChatSnapShot(roomID, moreChatData[moreChatData.length - 1].id)
      // setDocumentData([...moreChatData, ...documentData])
      setDocumentData([...documentData, ...moreChatData])
      setLastSnapShot(lastChatSnap)
    }
    setRefreshing(false)
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

  // const trimLength = () => {
  //   const docArray = [...documentData]
  //   let testBool = false
  //   while (docArray.length > 60) {
  //     if (!testBool) {
  //       console.log('Trimming chat data')
  //       testBool = true
  //     }
  //     docArray.pop()
  //   }
  //   setDocumentData(docArray)
  // }

  // IN FLATLIST COMPONENT
  // onMomentumScrollEnd={e => {
  //   if (e.nativeEvent.contentOffset.y === 0) {
  //     trimLength()
  //   }
  // }}

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
        inverted
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item, index) => String(index)} // Item Key
        onEndReached={() => {retrieveMore()}} // On End Reached (Takes a function)
        onEndReachedThreshold={0.5} // How Close To The End Of List Until Next Data Request Is Made
        refreshing={refreshing} // Refreshing (Set To True When End Reached)
        ListHeaderComponent={renderHeader} // Header (Activity Indicator)
        ref={flatlistRef}
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
    flexDirection: 'column'
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