import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updateProfile } from "firebase/auth";
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

function useAuthChangeUserData() {
  return (data) => updateProfile(fbaseAuth.currentUser, {
    nickname: "Turbo",
    role: "admin",
    displayName: 'Tomek'
  }).then(() => {
    // Profile updated!
    // ...
    console.log('update');
  }).catch((error) => {
    // An error occurred
    // ...
  });

}



function useAuth_writeEmail(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const writeEmail = async (newEmail) => {
    setLoading(true);
    await updateEmail(fbaseAuth.currentUser, newEmail)
    .then(() => {
      console.log('User email has changed');
      setLoading(false);
      setError(false);
    }).catch((error) => {
      console.error('Error changing users email', error)
      setLoading(false);
      setError(true);
    });
  };

  return [writeEmail, loading, error];
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


export { 
  useAuthSignIn, 
  useAuthSignOut, 
  useAuthRegisterUser, 
  useAuthUser, 
  useAuthChangeUserData,
  useAuth_writeEmail,
}