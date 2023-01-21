import { Route, Routes } from "react-router";
import EventAdd from "../Pages/EventAdd";
import ManageEvents from "../Pages/ManageEvents";
import EventEdit from "../Pages/EventEdit";
import ManageProgram from "../Pages/ManageProgram";

export default function ManageRoutes() {

  return (
      <Routes>
        <Route index element={<ManageEvents />} />
        <Route path="addEvent" element={<EventAdd />} />
        <Route path="editEvent/:eventID" element={<EventEdit />} />
        <Route path="eventDetails/:eventID" element={<ManageProgram />} />
      </Routes>
  )
}