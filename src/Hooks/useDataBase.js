import { ref, set } from "firebase/database";
import { fbaseDatabase } from './useFireBase';

function useDataBaseAddSession() {
  return (session) => {
    session.enable = false;
    set(ref(fbaseDatabase, 'events/202301'), {
      ...session
    });
  }
}


export { useDataBaseAddSession }