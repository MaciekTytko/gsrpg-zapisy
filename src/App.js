import './App.css';
import Main from "./Containers/Main"
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import { useAuthUser } from './Hooks/useAuth';
import EventContext from './Context/EventContext';
import { useDataBase_ReadEvents } from './Hooks/useDataBase';

function App() {
  const user = useAuthUser();
  const events = useDataBase_ReadEvents();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={user}>
        <EventContext.Provider value={events}>
          <div className="App">
            <Main />
          </div>
        </EventContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
