import { Route, Routes } from "react-router";
import EventAdd from "../Pages/EventAdd";
import ManageEvents from "../Pages/Manage/ManageEvents";
import EventEdit from "../Pages/EventEdit";
import ManageProgram from "../Pages/Manage/ManageProgram";
import NotFound404 from "../Pages/Errors/NotFound404";
import ManagePrintUserList from "../Pages/Manage/ManagePrintUserList";


export default function ManageRoutes() {

  return (
    <Routes>
      <Route index element={<ManageEvents />} />
      <Route path="addEvent" element={<EventAdd />} />
      <Route path="editEvent/:eventID" element={<EventEdit />} />
      <Route path="eventDetails/:eventID" element={<ManageProgram />} />
      <Route path="printUserList/:eventID" element={<ManagePrintUserList />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}