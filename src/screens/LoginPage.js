import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
import {Loading, CustomTextInput, CustomButton} from '../components/';



const LoginPage = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>Welcome {result}</Text>

      <Image style={styles.image}
        source={require('../../assets/images/loginicon.png')}
      />

      <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnChangeText={setEmail}
          handleValue={email}
          handlePlaceholder="Enter your email"
      />
      <CustomTextInput
          title="Password"
          isSecureText={true}
          handleOnChangeText={setPass}
          handleValue={pass}
          handlePlaceholder="Enter your password"
      />

      <CustomButton 
          buttonText="Login"
          handleOnPress={() => setIsLoading(true)}
      />

      <CustomButton 
          buttonText="Sign Up"
          handleOnPress={() => navigation.navigate('Signup')}
      />

      { isLoading ? <Loading changeIsLoading={() => setIsLoading(false)} /> : null }
      

      <StatusBar style="auto" />

    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 1,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
