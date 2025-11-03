import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
import Loading from '../components/Loading';



const LoginPage = ({navigation}) => {

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>

      <Image style={styles.image}
        source={require('../../assets/images/loginicon.png')}
      />

      <Text style={styles.welcome}>Welcome {result}</Text>

      <Text style = {styles.text}>Email</Text>

      <TextInput 
        inputMode='email'
        style={styles.textInput}
        placeholder="Enter your email"
        onChangeText={setName}
        value={name}
      />

      <Text style = {styles.text}>Password</Text>

      <TextInput 
        style={styles.textInput}
        placeholder="Enter your password"
        onChangeText={setPass}
        value={pass}
        secureTextEntry={true}
      />

      <Pressable
      onPress={() => setIsLoading(true)}
      style={ ({pressed}) => [{

        backgroundColor: pressed ? 'gray' : 'purple'

      },styles.button]   }>
        <Text style = {styles.textButton}>
          Login
        </Text>
      </Pressable>

      <Pressable
      onPress={() => navigation.navigate('Signup')}
      style={ ({pressed}) => [{

        backgroundColor: pressed ? 'gray' : 'purple'

      },styles.button]   }>
        <Text style = {styles.textButton}>
          Sign Up
        </Text>
      </Pressable>

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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: "80%",
    height: 50,
    marginTop: 10,
    textAlign: 'left',
    paddingLeft: 5,
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
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
  },
  image: {
    width: 150,
    height: 150,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
