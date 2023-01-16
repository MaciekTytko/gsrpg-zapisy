import { limitToLast, onValue, orderByChild, push, query, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { fbaseDatabase } from '../Firebase/Firebase';

function useDatabaseConectTemplate(callback, messageSuccess, messageFail) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const writeData = async (path, data) => {
    setLoading(true);
    const result = await callback(path, data)
      .then(() => {
        console.log(messageSuccess);
        setLoading(false);
        setError('');
        return '';
      }).catch(error => {
        console.error(messageFail, error.code);
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
  const [fun, loading, error] = useDatabaseConectTemplate(firebaseSet,'Write user data to DB','Error write user data: ');
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
  return (event) => {
    let path = 'events';
    push(ref(fbaseDatabase, path), {
      ...event
    });
  }
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



function useDataBase_ReadEvents() {
  const [eventList, setEventList] = useState('');

  useEffect(() => {
    const q = query(ref(fbaseDatabase, 'events'), orderByChild("date"), limitToLast(10));
    return onValue(q,
      (snapshot) => {
        const data = snapshot.val();
        console.log('###events###', data);
        setEventList(data || {});
      },
      (error) => {
        console.log('###' + JSON.stringify(error));
        setEventList('');
      })
  }, []);

  return eventList;
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

const templateData = {
  nickname: '-',
  contact: '-',
  picsURL: '',
};
function useDataBase_ReadUserData(userID) {
  const [userData, setUserData] = useState({ ...templateData });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const DBquery = ref(fbaseDatabase, 'users/' + userID);
    return onValue(DBquery,
      (snapshot) => {
        let data = snapshot.val();
        console.log('###userData###', data);
        if (snapshot.exists() === false) data = { ...templateData };
        setUserData(data);
        setLoading(false);
      },
      (error) => {
        console.error('Reading user data:', error);
        setLoading(false);
        setError(error);
      })
  }, [userID]);

  return [userData, loading, error];
}


export {
  useDataBase_AddEvent,
  useDataBase_AddProgram,
  useDataBase_AddProgramRegister,
  useDataBase_WriteUserData,
  useDataBase_ReadPrograms,
  useDataBase_ReadRegistrations,
  useDataBase_ReadEvents,
  useDataBase_ReadUserData,
  useDatabaseConectTemplate,
}