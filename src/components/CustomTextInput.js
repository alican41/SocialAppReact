import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const CustomTextInput = ({title, isSecureText, handleOnChangeText, handleValue, handlePlaceholder}) => {
    return (
        <View style= {styles.inputView}>
        
                <Text style = {styles.inputTypeText}>{title}</Text>
        
                <TextInput 
                  secureTextEntry={isSecureText}
                  style={styles.textInput}
                  placeholder={handlePlaceholder}
                  onChangeText={handleOnChangeText}
                  value={handleValue}
                />
              </View>
    );
}

export default CustomTextInput;


const styles = StyleSheet.create({
    inputTypeText: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
  },
  inputView: {
        width: '80%',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    textAlign: 'left',
    marginBottom: 3,
    borderRadius: 25,
  }
})
