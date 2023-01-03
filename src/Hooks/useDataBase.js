import { limitToLast, onValue, orderByChild, push, query, ref} from "firebase/database";
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
    let path = 'eventsProgram/'+eventID;
    console.log(path);
    push(ref(fbaseDatabase, path), {
      ...program,
      approved: true,
    });
  }
}

function useDataBase_AddProgramRegister() {
  return (eventID, program) => {
    let path = 'eventsProgram/'+eventID;
    console.log(path);
    push(ref(fbaseDatabase, path), {
      ...program,
      approved: true,
    });
  }
}

function useDataBase_ReadEvents() {
  const [eventList, setEventList] = useState('');

  useEffect(() => {
    const q = query(ref(fbaseDatabase, 'events'), orderByChild("date"), limitToLast(10));
    return onValue(q, 
      (snapshot) => {
      const data = snapshot.val();
      console.log('###events###',data);
      setEventList(data);
    }, 
    (error) => {
      console.log('###' + JSON.stringify(error));
      setEventList('');
    })
  }, []);
  
  return eventList;
}


function useDataBase_ReadProgram(eventId) {
  const [programList, setProgramList] = useState('');

  useEffect(() => {
    const q = ref(fbaseDatabase, 'eventsProgram/'+eventId);
    return onValue(q, 
      (snapshot) => {
      const data = snapshot.val();
      console.log('###eventsProgram###',data);
      setProgramList(data);
    }, 
    (error) => {
      console.log('###' + JSON.stringify(error));
      setProgramList('');
    })
  }, [eventId]);
  
  return programList;
}


export { useDataBase_AddEvent, useDataBase_AddProgram, useDataBase_ReadProgram, useDataBase_ReadEvents }