import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { fbaseDatabase } from './useFireBase';

function useDataBase_AddSession() {
  return (session) => {
    session.enable = false;
    set(ref(fbaseDatabase, 'events/202301/1'), {
      ...session
    });
  }
}

function useDataBase_ReadSessions(eventId) {
  //TODO use reducer to return state if exist
  const [sessionList, setSessionList] = useState('');

  useEffect(() => {
    const starCountRef = ref(fbaseDatabase, 'events/' + eventId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log('###' + JSON.stringify(data));
      setSessionList(data);
    })
  }, []);

  return sessionList;
}


export { useDataBase_AddSession, useDataBase_ReadSessions }