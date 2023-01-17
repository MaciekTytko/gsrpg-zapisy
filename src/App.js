import './App.css';
import Main from "./Containers/Main"
import { BrowserRouter } from 'react-router-dom';
import { AuthContext, AuthReloadContext } from './Context/AuthContext';
import { useAuthUser } from './Hooks/useAuth';
import EventContext from './Context/EventContext';
import { useDataBase_ReadEvents } from './Hooks/useDataBase';
import InfoBar from './Components/InfoBar'
import { useReducer } from 'react';
import { infoBarInitialState, infoBarReducer } from './Reduce/InfoBarReducer';
import InfoBarContext from './Context/InfoBarContext'

function App() {
  const [user, reloadUser] = useAuthUser();
  const events = useDataBase_ReadEvents();
  const [state, dispatch] = useReducer(infoBarReducer, infoBarInitialState);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={user}>
        <AuthReloadContext.Provider value={reloadUser}>
          <EventContext.Provider value={events}>
            <InfoBarContext.Provider value={{ state: state, dispatch: dispatch, }}>
              <div className="App">
                <Main />
              </div>
              <InfoBar />
            </InfoBarContext.Provider>
          </EventContext.Provider>
        </AuthReloadContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
