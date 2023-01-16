import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updateProfile } from "firebase/auth";
import { useDebugValue, useEffect, useState } from "react";
import { fbaseAuth } from '../Firebase/Firebase'
import { useDatabaseConectTemplate } from "./useDataBase";

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
//

function useAuth_signInWithEmailAndPassword() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => signInWithEmailAndPassword(fbaseAuth, data.email, data.password),
    'User sign in',
    'Error in sign in: ');
  const login = async (email, password) => {
    return await fun(null, {email, password});
  }
  return [login, loading, error];
};

function useAuth_signOut() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => signOut(fbaseAuth),
    'User sign out',
    'Error in sign out: ');
  const logout = async () => {
    return await fun(null, null);
  }
  return [logout, loading, error];
};

function useAuth_RegisterWithEmailAndPassword() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => createUserWithEmailAndPassword(fbaseAuth, data.email, data.password),
    'User registered',
    'Error in register user: ');
  const register = async (email, password) => {
    return await fun(null, {email, password});
  }
  return [register, loading, error];
};

function useAuth_SendEmailVerification() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => sendEmailVerification(fbaseAuth.currentUser),
    'Verified email send',
    'Error in sending verification email: ');
  const sendEmail = async () => {
    return await fun(null, null);
  }
  return [sendEmail, loading, error];
};





function useAuth_writeEmail() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => updateEmail(fbaseAuth.currentUser, data),
    'User changed email address',
    'Error in change email address: ');
  const writeEmail = async (email) => {
    return await fun(null, email);
  }
  return [writeEmail, loading, error];
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
      console.log(user);
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
  useAuth_signInWithEmailAndPassword,
  useAuth_signOut,
  useAuth_RegisterWithEmailAndPassword,
  useAuth_SendEmailVerification,
}