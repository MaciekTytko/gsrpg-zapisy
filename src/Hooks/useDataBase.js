import { limitToLast, onValue, orderByChild, push, query, ref, remove, set, update } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { fbaseAuth, fbaseDatabase } from '../Firebase/Firebase';

function useDatabaseConectTemplate(callback, messageSuccess, messageFail) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const writeData = async (path, data) => {
    setLoading(true);
    const result = await callback(path, data)
      .then(() => {
        messageSuccess && console.log(messageSuccess);
        setLoading(false);
        setError('');
        return '';
      }).catch(error => {
        messageFail && console.error(messageFail, error.code);
        setLoading(false);
        setError(error.code);
        return error.code;
      });
    return result;
  }
  return [writeData, loading, error];
}
const firebaseSet = (path, data) => set(ref(fbaseDatabase, path), { ...data });
const firebasePush = (path, data) => push(ref(fbaseDatabase, path), { ...data });
const firebaseUpdate = (path, data) => update(ref(fbaseDatabase, path), { ...data });
const firebaseRemove = (path, data) => remove(ref(fbaseDatabase, path));

function useDataBase_WriteUserData() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseSet(path, data).then(
      () => updateProfile(fbaseAuth.currentUser, { displayName: data.displayName, photoURL: data.photoURL })
    ),
    'Write user data to DB',
    'Error write user data: ');
  const writeData = async (userID, userData, userEmail) => {
    const path = 'users/' + userID;
    const data = {
      ...userData,
      userEmail
    };
    return await fun(path, data);
  }
  return [writeData, loading, error];
}

function useDataBase_AddEvent() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebasePush(path, data),
    'Add event to database',
    'Error add event: ');
  const addEvent = async (values) => {
    const path = 'events';
    const data = values;
    return await fun(path, data);
  }
  return [addEvent, loading, error];
}
function useDataBase_EditEvent() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseUpdate(path, data),
    'Edit event from database',
    'Error edit event: ');
  const addEvent = async (eventID, values) => {
    const path = 'events/' + eventID;
    const data = values;
    return await fun(path, data);
  }
  return [addEvent, loading, error];
}
function useDataBase_RemoveEvent() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseRemove(path, data),
    'Remove event from database',
    'Error remove event: ');
  const removeEvent = async (eventID) => {
    const path = 'events/' + eventID;
    const data = null;
    return await fun(path, data);
  }
  return [removeEvent, loading, error];
}

function useDataBase_AddProgram() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebasePush(path, data),
    'Add Program to database',
    'Error add Program: ');
  const addProgram = async (eventID, program) => {
    const path = 'eventsProgram/' + eventID;
    const data = {
      ...program,
      approved: false,
    };
    return await fun(path, data);
  }
  return [addProgram, loading, error];
}
function useDataBase_EditProgram() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseUpdate(path, data),
    'Edit Program from database',
    'Error edit Program: ');
  const addProgram = async (eventID, programID, program) => {
    const path = 'eventsProgram/' + eventID + '/' + programID;
    const data = {
      ...program,
    };
    return await fun(path, data);
  }
  return [addProgram, loading, error];
}
function useDataBase_RemoveProgram() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseRemove(path, data),
    'Remove Program from database',
    'Error remove Program: ');
  const removeProgram = async (eventID, programID) => {
    const path = 'eventsProgram/' + eventID + '/' + programID;
    const data = null;
    return await fun(path, data);
  }
  return [removeProgram, loading, error];
}
function useDataBase_ApproveProgram() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseUpdate(path, data),
    'Approve Program from database',
    'Error approve Program: ');
  const removeProgram = async (eventID, programID, approved = true) => {
    const path = 'eventsProgram/' + eventID + '/' + programID ;
    const data = {approved};
    return await fun(path, data);
  }
  return [removeProgram, loading, error];
}
function useDataBase_AddProgramRegistration() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseSet(path, data),
    'Register user to program',
    'Error register Program: ');
  const addProgramRegistration = async (eventID, programID, clientID) => {
    const path = 'eventsRegister/' + eventID + '/' + programID + '/' + clientID ;
    const data = {
      "timestamp": { ".sv": "timestamp" },
    };
    return await fun(path, data);
  }
  return [addProgramRegistration, loading, error];
}
function useDataBase_RemoveProgramRegistration() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseRemove(path, data),
    'Remove register user to program',
    'Error remove register Program: ');
  const removeProgramRegistration = async (eventID, programID, clientID) => {
    const path = 'eventsRegister/' + eventID + '/' + programID + '/' + clientID ;
    const data = null;
    return await fun(path, data);
  }
  return [removeProgramRegistration, loading, error];
}


//############# READ #############

function useDatabaseReadTemplate(DBquery, dataTemplate, messageSuccess, messageFail) {
  const [data, setData] = useState(dataTemplate);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    return onValue(DBquery,
      (snapshot) => {
        let readData = snapshot.val();
        messageSuccess && console.log(messageSuccess, readData);
        if (snapshot.exists() === false) readData = dataTemplate;
        setData(readData);
        setLoading(false);
        setError('');
      },
      (error) => {
        messageFail && console.error(messageFail, error.code);
        setLoading(false);
        setError(error.code);
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, loading, error];
}

function useDataBase_ReadUserData(userID) {
  const [userData, loading, error] = useDatabaseReadTemplate(
    ref(fbaseDatabase, 'users/' + userID),
    {
      displayName: '-', contact: '-', photoURL: '',
    },
    '###userData###',
    'Error reading user data: ');
  return [userData, loading, error];
}

function useDataBase_ReadEvents() {
  const [eventsList, loading, error] = useDatabaseReadTemplate(
    query(ref(fbaseDatabase, 'events'), orderByChild("date"), limitToLast(10)),
    {},
    '###events###',
    'Error reading events: ');
  return [eventsList, loading, error];
}
function useDataBase_ReadPrograms(eventId) {
  const [programList, loading, error] = useDatabaseReadTemplate(
    ref(fbaseDatabase, 'eventsProgram/' + eventId),
    {},
    '###eventsProgram###',
    'Error reading events program: ');
  return [programList, loading, error];
}
function useDataBase_ReadRegistrations(eventId) {
  const [registerList, loading, error] = useDatabaseReadTemplate(
    ref(fbaseDatabase, 'eventsRegister/' + eventId),
    {},
    '###eventsRegister###',
    'Error reading events register: ');
  return [registerList, loading, error];
}





/*
 * Function return State with information if user is Admin. 
 * @param {userID} current user UID
 * @default false
 */
function useDataBase_ReadPermission(userID) {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    return onValue(ref(fbaseDatabase, 'admins/' + userID),
      (snapshot) => {
        setAdmin(snapshot.exists());
        console.log('###Permision###', snapshot.exists());
      },
      (error) => {
        console.error('Error reading user permission: ', error.code);
      })
  }, [userID]);

  return admin;
}







export {
  useDatabaseConectTemplate,
  useDataBase_WriteUserData,
  useDataBase_AddEvent,
  useDataBase_EditEvent,
  useDataBase_RemoveEvent,
  useDataBase_AddProgram,
  useDataBase_EditProgram,
  useDataBase_RemoveProgram,
  useDataBase_ApproveProgram,
  useDataBase_AddProgramRegistration,
  useDataBase_RemoveProgramRegistration,
  useDataBase_ReadPrograms,
  useDataBase_ReadRegistrations,
  useDataBase_ReadEvents,
  useDataBase_ReadUserData,
  useDataBase_ReadPermission,
}