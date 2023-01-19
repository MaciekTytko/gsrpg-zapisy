import { limitToLast, onValue, orderByChild, push, query, ref, remove, set } from "firebase/database";
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

function useDataBase_RemoveEvent() {
  const [fun, loading, error] = useDatabaseConectTemplate(
    (path, data) => firebaseSet(path, data),
    'Remove event from database',
    'Error remove event: ');
  const removeEvent = async (eventID) => {
    const path = 'events/' + eventID;
    const data = null;
    return await fun(path, data);
  }
  return [removeEvent, loading, error];
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
    (path, data) => firebaseSet(path, data),
    'Edit event from database',
    'Error edit event: ');
  const addEvent = async (eventID, values) => {
    const path = 'events/'+eventID;
    const data = values;
    return await fun(path, data);
  }
  return [addEvent, loading, error];
}






function useDataBase_AddProgram() {
  return (eventID, program) => {
    let path = 'eventsProgram/' + eventID;
    push(ref(fbaseDatabase, path), {
      ...program,
      approved: true,
    });
  }
}

function useDataBase_AddProgramRegister() {
  const register = (eventId, programId, clientId) => {
    let path = 'eventsRegister/' + eventId + '/' + programId + '/' + clientId;
    set(ref(fbaseDatabase, path), {
      "timestamp": { ".sv": "timestamp" },
    });
  }
  const registerDelete = (eventId, programId, clientId) => {
    let path = 'eventsRegister/' + eventId + '/' + programId + '/' + clientId;
    remove(ref(fbaseDatabase, path));
  }
  return { register, registerDelete }
}





function useDataBase_ReadPrograms(eventId) {
  const [programList, setProgramList] = useState('');

  useEffect(() => {
    const q = ref(fbaseDatabase, 'eventsProgram/' + eventId);
    return onValue(q,
      (snapshot) => {
        const data = snapshot.val();
        console.log('###eventsProgram###', data);
        setProgramList(data);
      },
      (error) => {
        console.log('###' + JSON.stringify(error));
        setProgramList('');
      })
  }, [eventId]);

  return programList;
}

function useDataBase_ReadRegistrations(eventId) {
  const [registerList, setRegisterList] = useState('');

  useEffect(() => {
    const q = ref(fbaseDatabase, 'eventsRegister/' + eventId);
    return onValue(q,
      (snapshot) => {
        const data = snapshot.val();
        console.log('###eventsRegister###', data);
        setRegisterList(data);
      },
      (error) => {
        console.log('###' + JSON.stringify(error));
        setRegisterList('');
      })
  }, [eventId]);

  return registerList;
}







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
        console.log('###Permision###',snapshot.exists() );
      },
      (error) => {
        console.error('Error reading user permission: ', error.code);
      })
  }, [userID]);

  return admin;
}







export {
  useDatabaseConectTemplate,
  useDataBase_AddEvent,
  useDataBase_AddProgram,
  useDataBase_AddProgramRegister,
  useDataBase_WriteUserData,
  useDataBase_ReadPrograms,
  useDataBase_ReadRegistrations,
  useDataBase_ReadEvents,
  useDataBase_ReadUserData,
  useDataBase_ReadPermission,
  useDataBase_RemoveEvent,
  useDataBase_EditEvent
}