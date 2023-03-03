import { Route, Routes } from "react-router";
import { lazy, Suspense, useContext } from "react";
import UserLogin from "../Pages/UserLogin";
import UserProfile from "../Pages/UserProfile";
import EventList from "../Pages/EventList";
import Events from "../Pages/MainPage/Events";
import ProgramAdd from "../Pages/ProgramAdd";
import ProgramEdit from "../Pages/ProgramEdit";
import Test from "../Pages/Test";
import AuthContext from '../Context/AuthContext';
import UserRegister from "../Pages/UserRegister";
import NotFound404 from "../Pages/Errors/NotFound404";
import AuthCheck from "../Components/Route/AuthCheck";
import Contact from "../Pages/Bureaucracy/Contact";

const ManageRoutes = lazy(() => import("./ManageRoutes"));

export default function SiteRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Suspense fallback={<p>Ładowanie ...</p>}>
      <Routes>
        <Route path="/">
          <Route index element={<Events />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="user" element={<AuthCheck><UserProfile /></AuthCheck>} />

          <Route path="events" >
            <Route index element={<EventList />} />
            <Route path=":id" element={<EventList />} />
            <Route path="addProgram/:eventID" element={<AuthCheck><ProgramAdd /></AuthCheck>} />
            <Route path="editProgram/:eventID/:programID" element={<AuthCheck><ProgramEdit /></AuthCheck>} />
          </Route>

          {user && <Route path="manage/*" element={<ManageRoutes/>} />}

          <Route path="contact" element={<Contact />} />

          <Route path="test" element={<Test />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </Suspense>
  )
}