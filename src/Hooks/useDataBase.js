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
  return {register, registerDelete}
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


export {
  useDataBase_AddEvent,
  useDataBase_AddProgram,
  useDataBase_AddProgramRegister,
  useDataBase_ReadPrograms,
  useDataBase_ReadRegistrations,
  useDataBase_ReadEvents,
}