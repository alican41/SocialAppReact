import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Pressable } from 'react-native';

const Loading = (props) => {
    return (
        <View style={styles.container}>
            <Pressable 
            onPress={() => props.changeIsLoading()}
            style={ ({}) => [{

                

            },styles.button]   }>

                <Text style={styles.buttonText}> X </Text>

            </Pressable>
            <ActivityIndicator size="large" color="purple" />
            <Text style={styles.loadingText} >Loading...</Text>
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        color: 'purple',
    },
    button: {
        borderWidth: 1,
        width:  50,
        height: 50,
        borderRadius: 25,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 50,
        right: 20,
    },
    buttonText: {
        color: 'purple',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
    }
})


