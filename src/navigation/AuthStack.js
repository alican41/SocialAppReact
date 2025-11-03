import React from 'react';
import { LoginPage, SignupPage } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >
            <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={SignupPage} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default AuthStack;
