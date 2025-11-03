import React from 'react';
import { HomePage, ProfilePage } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}} />
            <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default UserStack;
