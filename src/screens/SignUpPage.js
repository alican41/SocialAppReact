import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { CustomTextInput, CustomButton } from "../components/";
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Image style={styles.image}
                  source={require('../../assets/images/signupicon.png')}
                />
           <Text style={styles.signUpText}>Sign Up</Text>     
        </View>
        <View style={styles.textContainer}>
          <CustomTextInput
            title="Name"
            isSecureText={false}
            handleOnChangeText={setName}
            handleValue={name}
            handlePlaceholder="Enter your name"
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
        </View>
        <View style={styles.signUpOptions}>
          <CustomButton
            buttonText="Sign Up"
            handleOnPress={() => console.log(name," ", email," ", pass)}
          />
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight:'bold'}}>Already have an account? Login</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  signUpText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textContainer: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    justifyContent: "center",
  },
  signUpOptions: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "space-between",
    flex: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  }
});
