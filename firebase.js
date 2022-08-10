// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/compat/auth';


  let firebaseApp;
  let firebaseAuth;// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNVXlkWKBZddjqVEzv7KhoCalZjKaNd_A",
  authDomain: "seasonal-cookbook-auth.firebaseapp.com",
  projectId: "seasonal-cookbook-auth",
  storageBucket: "seasonal-cookbook-auth.appspot.com",
  messagingSenderId: "462389635794",
  appId: "1:462389635794:web:34218d6f9401777d2e1b0b",
  measurementId: "G-NLG2LM2XXB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();

export { auth };