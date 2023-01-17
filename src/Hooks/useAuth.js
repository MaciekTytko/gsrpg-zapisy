import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { useDebugValue, useEffect, useState } from "react";
import { fbaseAuth } from '../Firebase/Firebase'
import { useDatabaseConectTemplate } from "./useDataBase";

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

//TODO reAuthenticate with another provider than firebase
function useAuth_reAuthenticate() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => reauthenticateWithCredential(fbaseAuth.currentUser, data),
    'reAuthenticate',
    'Error in reAuthenticated: ');
  const sendEmail = async () => {
    return await fun(null, null);
  }
  return [sendEmail, loading, error];
};

function useAuth_deleteAccount() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => deleteUser(fbaseAuth.currentUser),
    'Delete user account',
    'Error in deleting user account: ');
  const deleteAccount = async () => {
    return await fun(null, null);
  }
  return [deleteAccount, loading, error];
};

function useAuth_updateProfile() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => updateProfile(fbaseAuth.currentUser, data),
    'Updated user account',
    'Error in Updating user account: ');
  const updateProfile = async (displayName,photoURL) => {
    return await fun(null, {displayName, photoURL});
  }
  return [updateProfile, loading, error];
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
function useAuth_writePassword() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => updatePassword(fbaseAuth.currentUser, data),
    'User changed password',
    'Error in change password: ');
  const writeEmail = async (password) => {
    return await fun(null, password);
  }
  return [writeEmail, loading, error];
}
function useAuth_sendEmailResetPassword() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => sendPasswordResetEmail(fbaseAuth, data),
    'User changed password',
    '');
  const writeEmail = async (email) => {
    return await fun(null, email);
  }
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
    return onAuthStateChanged(fbaseAuth, (fbUser) => {
      setUser(fbUser);
      console.log('### user changed ###',fbUser);
    });
  }, []);

  const reloadUser = async ()=>{
    await fbaseAuth.currentUser.reload();
    setUser(fbaseAuth.currentUser);
    console.log('### user reload ###',user);
  }

  return [user, reloadUser];
}


export {
  useAuthUser,
  useAuth_writeEmail,
  useAuth_signInWithEmailAndPassword,
  useAuth_signOut,
  useAuth_RegisterWithEmailAndPassword,
  useAuth_SendEmailVerification,
  useAuth_reAuthenticate,
  useAuth_deleteAccount,
  useAuth_updateProfile,
  useAuth_writePassword,
  useAuth_sendEmailResetPassword,
}