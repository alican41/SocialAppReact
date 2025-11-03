import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
        </View>
    );
}

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
