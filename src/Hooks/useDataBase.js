import { limitToLast, onValue, orderByKey, push, query, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { fbaseDatabase } from '../Firebase/Firebase';

function useDataBase_AddEvent() {
  return (event) => {
    let path = 'events/'+event.date.substring(1,8).replace('-','');
    push(ref(fbaseDatabase, path), {
      ...event
    });
  }
}

function useDataBase_AddSession() {
  return (session) => {
    session.enable = false;
    set(ref(fbaseDatabase, 'events/202301/1'), {
      ...session
    });
  }
}

function useDataBase_ReadEvents() {
  const [eventList, setEventList] = useState('');

  useEffect(() => {
    const q = query(ref(fbaseDatabase, 'events'), orderByKey(), limitToLast(6));
    onValue(q, 
      (snapshot) => {
      const data = snapshot.val();
      console.log('###',data);
      setEventList(data);
    }, 
    (error) => {
      console.log('###' + JSON.stringify(error));
      setEventList('');
    })
  }, []);
  
  return eventList;
}


function useDataBase_ReadSessions(eventId) {
  const [sessionList, setSessionList] = useState('');

  useEffect(() => {
    const starCountRef = ref(fbaseDatabase, 'events/' + eventId);
    onValue(starCountRef, 
      (snapshot) => {
      const data = snapshot.val();
      console.log('###' + JSON.stringify(data));
      setSessionList(data);
    }, 
    (error) => {
      console.log('###' + JSON.stringify(error));
      setSessionList('');
    })
  }, []);
  
  return sessionList;
}


export { useDataBase_AddEvent, useDataBase_AddSession, useDataBase_ReadSessions, useDataBase_ReadEvents }