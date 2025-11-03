import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const CustomButton = ({buttonText, handleOnPress}) => {
    return (
        <Pressable
              onPress={handleOnPress}
              style={ ({pressed}) => [{
        
                backgroundColor: pressed ? 'gray' : 'purple'
        
              },styles.button]   }>
                <Text style = {styles.textButton}>
                  {buttonText}
                </Text>
              </Pressable>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: "80%",
        height: 50,
        borderRadius: 25,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
  },
   textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
  }
})
