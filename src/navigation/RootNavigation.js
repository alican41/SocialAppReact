import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import UserStack from './userStack';
import { useSelector } from 'react-redux';

const RootNavigation = () => {

    const { isAuth } = useSelector((state) => state.user);

    return (
        <NavigationContainer>
            {
                isAuth ? <UserStack /> : <AuthStack />
            }
        </NavigationContainer>
    );
}

export default RootNavigation;
