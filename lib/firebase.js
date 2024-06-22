import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC4zeOThhrKnNwkZna-ZcF0MAy-fVeoi8",
  authDomain: "morons-b64c3.firebaseapp.com",
  projectId: "morons-b64c3",
  storageBucket: "morons-b64c3.appspot.com",
  messagingSenderId: "452862379695",
  appId: "1:452862379695:web:76b102b7c90f1458d2b65a",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
