// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwRX7ZFjdzTXmRoomarUX3PGP0GPaJDK8",
  authDomain: "user-email-password-auth-41df7.firebaseapp.com",
  projectId: "user-email-password-auth-41df7",
  storageBucket: "user-email-password-auth-41df7.appspot.com",
  messagingSenderId: "896873191140",
  appId: "1:896873191140:web:bcf3339bb312004212bef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;