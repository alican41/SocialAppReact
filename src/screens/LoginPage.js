import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Loading, CustomTextInput, CustomButton} from '../components/';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/userSlice';
import { login, autoLogin } from '../redux/userSlice'; 



const LoginPage = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  //const [isLoading, setIsLoading] = useState(false);

  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //autologin
  useEffect(() => {
    dispatch(autoLogin())
  }, []);
                        

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>Welcome</Text>

      <Image style={styles.image}
        source={require('../../assets/images/loginicon.png')}
      />

      <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnChangeText={(text) => setEmail(text)}
          handleValue={email}
          handlePlaceholder="Enter your email"
      />
      <CustomTextInput
          title="Password"
          isSecureText={true}
          handleOnChangeText={(pass) => setPass(pass)}
          handleValue={pass}
          handlePlaceholder="Enter your password"
      />

      <CustomButton 
          buttonText="Login"
          handleOnPress={() => dispatch(login({email, pass}))}
      />

      <CustomButton 
          buttonText="Sign Up"
          handleOnPress={() => navigation.navigate('Signup')}
      />

      { isLoading ? <Loading changeIsLoading={() => dispatch(setIsLoading(false))} /> : null }
      

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
