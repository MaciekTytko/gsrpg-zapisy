// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyClVDjUkGzjferw33NB0-ycsYnsq1KeKPk",
  authDomain: "gsrpg-zapisy.firebaseapp.com",
  databaseURL: "https://gsrpg-zapisy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gsrpg-zapisy",
  storageBucket: "gsrpg-zapisy.appspot.com",
  messagingSenderId: "1067244794520",
  appId: "1:1067244794520:web:80448b4c09be7d61eed6ed",
  measurementId: "G-RW8JVP5BXD"
};

// Initialize Firebase
const fbaseApp = initializeApp(firebaseConfig);
const fbaseAuth = getAuth(fbaseApp);
const fbaseAnalytics = getAnalytics(fbaseApp);

export {fbaseApp, fbaseAuth, fbaseAnalytics};



// create new user
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });



//Sign in user
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


//On user change
//import { getAuth, onAuthStateChanged } from "firebase/auth";
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });