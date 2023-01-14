import { limitToLast, onValue, orderByChild, push, query, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { fbaseDatabase } from '../Firebase/Firebase';

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

function useDataBase_AddUserInfo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const writeData = async (userID, userData, userEmail) => {
    let path = 'users/' + userID;
    setLoading(true);
    set(ref(fbaseDatabase, path), {
      ...userData,
      userEmail
    }).then(() => {
      console.log('Write user data to DB');
      setLoading(false);
      setError(false);
    }).catch(error => {
      console.error('Error write user data', error)
      setLoading(false);
      setError(true);
    });
  }
  return [writeData, loading, error];
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
  useDataBase_AddUserInfo,
  useDataBase_ReadPrograms,
  useDataBase_ReadRegistrations,
  useDataBase_ReadEvents,
  useDataBase_ReadUserData,
}