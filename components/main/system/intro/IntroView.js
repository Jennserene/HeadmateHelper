import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view'

// This component is used in components/main/system/Intro.js
const IntroView = (props) => {

  const { introContents } = props

  return (
    <View style={styles.ContainerView}>
      <MarkdownView>
        { introContents }
      </MarkdownView>
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