import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fbaseAuth } from '../Firebase/Firebase'

function useAuthSignIn() {
  return (email, password) => signInWithEmailAndPassword(fbaseAuth, email, password)
    .then((userCredential) => {
      console.log('Zalogowano użytkownika');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return false;
    })
}

function useAuthSignOut() {
  return () => signOut(fbaseAuth).then(() => {
    console.log('Wylogowano użytkownika');
    return true;
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

function useAuthRegisterUser() {
  return (email, password) => createUserWithEmailAndPassword(fbaseAuth, email, password)
    .then((userCredential) => {
      console.log('Rejestracja przebiegła pomyślnie');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function useAuthUserData() {
  return fbaseAuth.currentUser;
}

function useAuthUser() {
  return () => onAuthStateChanged(fbaseAuth, (user) => {
    //console.log(user);
    return user;
  });
}




export { useAuthSignIn, useAuthSignOut, useAuthRegisterUser, useAuthUserData, useAuthUser }