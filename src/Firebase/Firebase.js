// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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
const fbaseDatabase = getDatabase(fbaseApp);

export {fbaseApp, fbaseAuth, fbaseAnalytics, fbaseDatabase};

