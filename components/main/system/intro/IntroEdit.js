import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, Keyboard } from 'react-native';

const IntroEdit = (props) => {

  const [textInputHeight, setTextInputHeight] = useState(100)
  const [textInputMaxH, setTextInputMaxH] = useState(340)

  const { updateContents, introContents } = props
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setTextInputMaxH(340);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setTextInputMaxH(500);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ScrollView style={[styles.ScrollContainer, {height: textInputHeight > textInputMaxH ? textInputMaxH : textInputHeight}]}>
      <TextInput 
        style={styles.IntroInput}
        multiline 
        onChangeText={ (text) => {updateContents(text)} } 
        onContentSizeChange={event => {
          const { contentSize } = event.nativeEvent
          setTextInputHeight(contentSize.height)
        }}
        value={introContents} 
        defaultValue={introContents} 
        autoFocus={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollContainer: {
    maxHeight: '100%'
  },
  IntroInput: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    backgroundColor: '#BFA8FF',
  },
})

export default IntroEdit;