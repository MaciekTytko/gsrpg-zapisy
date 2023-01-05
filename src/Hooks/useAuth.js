import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useDebugValue, useEffect, useState } from "react";
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

/*
 * Function return State with object with information of loged user
 * @default null
 */
function useAuthUser() {
  const [user, setUser] = useState(null);
  useDebugValue(user ? 'Login' : 'Logout')

  useEffect(() => {
    return onAuthStateChanged(fbaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return user;
}


export { useAuthSignIn, useAuthSignOut, useAuthRegisterUser, useAuthUser }