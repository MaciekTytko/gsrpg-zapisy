import { Container, Typography } from "@mui/material";
import { Route, Routes, } from "react-router-dom";
import { useAuthUser } from "../Hooks/useAuth";
import UserLogin from "../Pages/UserLogin";
import UserProfile from "../Pages/UserProfile";
import UserNotLogin from "../Pages/UserNotLogin";
import EventList from "../Pages/EventList";
import Events from "../Pages/Events";
import EventsSessionAdd from "../Pages/EventsSessionAdd";
import EventsAdd from "../Pages/EventAdd";
import Test from "../Pages/Test";

function Main() {
  const userData = useAuthUser();

  return (
    <>
      <Container>
        <Typography variant="h1" >Gliwickie Spotkania RPG</Typography>
        <Typography variant="body1" gutterBottom>Comiesięczne święto erpegowców już dostępne w aplikacji!</Typography>

        <Routes>
          <Route path="/">
            <Route index element={<EventList />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="test" element={<Test />} />
            <Route path="events" >
              <Route index element={<Events />} />
              <Route path="addEvent" element={<EventsAdd />} />
              <Route path="addSession" element={<EventsSessionAdd />} />
            </Route>
            <Route path="user" element={userData() ? <UserProfile /> : <UserNotLogin />} />
          </Route>
        </Routes>
      </Container>
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