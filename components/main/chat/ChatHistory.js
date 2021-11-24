import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Context from '../../../Context'
import { getNewMsg, getInitChatQuery, getMoreChatQuery, getLastChatSnapShot } from '../../../Firebase'

const ChatHistory = (props) => {

  const context = useContext(Context)

  const { roomID, newMsg } = props

  const [refreshing, setRefreshing] = useState(false)
  const [limit, setLimit] = useState(40)
  const [documentData, setDocumentData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastSnapShot, setLastSnapShot] = useState(null)

  useEffect( () => {
    const addNewMsg = async () => {
      if (newMsg) {
        const msg = await getNewMsg(roomID, newMsg)
        if (documentData) {
          setDocumentData([...documentData, msg])
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
      if (chatData.length > 0) {
        const lastChatSnap = await getLastChatSnapShot(roomID, chatData[0].id)
        setDocumentData(chatData)
        setLastSnapShot(lastChatSnap)
      }
      setLoading(false)
    };
    retrieveData()
  }, [roomID])

  // Retrieve More
  const retrieveMore = async () => {
    if (documentData.length < 40) {return}
    setRefreshing(true)
    const moreChatData = await getMoreChatQuery(roomID, limit, lastSnapShot)
    if (moreChatData.length > 0) {
      const lastChatSnap = await getLastChatSnapShot(roomID, moreChatData[0].id)
      setDocumentData([...moreChatData, ...documentData])
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