import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'

const AlterField = (props) => {

  const {label, fieldName, content, handleFieldUpdate, multi, nameError} = props

  const handleChange = (text) => {
    handleFieldUpdate(fieldName, text)
  }

  return (
    <View>
      <View style={styles.InputView}>
        <Text style={styles.InputText}>{label}:</Text>
        <View style={styles.TextInputView}>
          { !multi && <TextInput
            style={styles.inputField}
            placeholder={content}
            value={content}
            onChangeText={text => handleChange(text)}/> }
          { multi && <TextInput
            style={styles.inputField}
            multiline
            numberOfLines={4}
            placeholder={content}
            value={content}
            onChangeText={text => handleChange(text)}/> }
        </View>
      </View>
      { (fieldName == 'name' && nameError) ? <Text style={styles.ErrorText}>{nameError}</Text> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  InputView: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingRight: 10,
  },
  InputText: {
    fontSize: 17,
    paddingRight: 10,
  },
  InputField: {
    flex: 1,
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0,
  },
  TextInputView: {
    backgroundColor: '#BFA8FF',
    flex: 1,
  },
  ErrorText: {
    backgroundColor: 'black',
    color: 'red',
    paddingLeft: 60,
  },
})

export default AlterField;