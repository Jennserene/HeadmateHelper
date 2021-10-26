import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-simple-markdown'

const IntroView = (props) => {

  const { introContents } = props

  return (
    <View style={styles.ContainerView}>
      <Markdown>
        { introContents }
      </Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerView: {
    marginLeft: 10,
    marginRight: 10,
  },
})

export default IntroView;