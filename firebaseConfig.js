// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAcUv_HHbgkXNw44DUzIq0cIZfhD3VSIaE",
  authDomain: "social-app-c91f4.firebaseapp.com",
  projectId: "social-app-c91f4",
  storageBucket: "social-app-c91f4.firebasestorage.app",
  messagingSenderId: "540876405235",
  appId: "1:540876405235:web:01b0f518c4f5337fa93a86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;