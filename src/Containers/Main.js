import { Container } from "@mui/material";
import { Route, Routes, } from "react-router-dom";
import { useContext } from "react";
import UserLogin from "../Pages/UserLogin";
import UserProfile from "../Pages/UserProfile";
import UserNotLogin from "../Pages/UserNotLogin";
import EventList from "../Pages/EventList";
import Events from "../Pages/Events";
import EventsProgramAdd from "../Pages/EventsProgramAdd";
import EventAdd from "../Pages/EventAdd";
import Test from "../Pages/Test";
import Header from "./Header";
import MenuSite from "./MenuSite";
import Footer from "./Footer";
import AuthContext from '../Context/AuthContext';
import UserRegister from "../Pages/UserRegister";
import UserVerifyEmail from "../Pages/UserVerifyEmail";
import ManageEvents from "../Pages/ManageEvents";
import EventEdit from "../Pages/EventEdit";

function Main() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <MenuSite />
      <Container>
        {(!user?.emailVerified && user?.providerId === "firebase")
          ? <UserVerifyEmail />
          : <Routes>
            <Route path="/">
              <Route index element={<Events />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="register" element={<UserRegister />} />
              <Route path="test" element={<Test />} />

              <Route path="events" >
                <Route index element={<EventList />} />
                <Route path=":id" element={<EventList />} />
                <Route path="addProgram/:id" element={<EventsProgramAdd />} />
              </Route>

              <Route path="manage" >
                <Route index element={<ManageEvents />} />
                <Route path="addEvent" element={<EventAdd />} />
                <Route path="editEvent/:eventID" element={<EventEdit />} />
              </Route>

              <Route path="user" element={user != null ? <UserProfile /> : <UserNotLogin />} />
            </Route>
          </Routes>
        }

      </Container>
      <Footer />
      <Header />
    </>
  )
}

export default Main;




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <EventList />,
//     loader: <SkeletonLikeSpinner />,
//     children: [
//       {
//         path: "login",
//         element: <UserLogin />,
//         loader: <SkeletonLikeSpinner />,
//       },
//     ],
//   },
// ]);