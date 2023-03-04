import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import { useAuthUser } from './Hooks/useAuth';
import EventContext from './Context/EventContext';
import { useDataBase_ReadEvents, useDataBase_ReadPermission } from './Hooks/useDataBase';
import InfoBar from './Components/InfoBar'
import { useReducer } from 'react';
import { infoBarInitialState, infoBarReducer } from './Reduce/InfoBarReducer';
import InfoBarContext from './Context/InfoBarContext'
import MainPageRoutes from './Routes/MainPageRoutes';

function App() {
  const [user, reloadUser] = useAuthUser();
  const admin = useDataBase_ReadPermission(user?.uid);
  const events = useDataBase_ReadEvents();
  const [state, dispatch] = useReducer(infoBarReducer, infoBarInitialState);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{
        user: user,
        reloadUser,
        admin,
      }}>
        <EventContext.Provider value={events}>
          <InfoBarContext.Provider value={{ state: state, dispatch: dispatch, }}>
            <div className="App">
              <MainPageRoutes />
            </div>
            <InfoBar />
          </InfoBarContext.Provider>
        </EventContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter >
  );
}

export default App;
