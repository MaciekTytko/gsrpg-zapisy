import { Route, Routes } from "react-router";
import MainPage from "../Pages/MainPage/MainPage";
import Main from "../Containers/Main";

export default function MainPageRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  )
}