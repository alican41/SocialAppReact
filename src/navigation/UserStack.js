import React from 'react';
import { HomePage, ProfilePage } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerStyle: {
                backgroundColor: 'purple', // 1. Barın rengini purple yapar
            },
            headerTintColor: 'white', // 2. Yazıyı (ve geri tuşunu) white yapar
            headerTitleStyle: {
                fontWeight: 'bold', // (Opsiyonel) Yazı stili
            },
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={HomePage} options={{headerShown:true}} />
            <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown:true}} />
        </Stack.Navigator>
    );
}

export default UserStack;
