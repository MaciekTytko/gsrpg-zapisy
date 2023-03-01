
import { useContext } from "react";
import Header from "./Header";
import MenuSite from "./MenuSite";
import Footer from "./Footer";
import AuthContext from '../Context/AuthContext';
import UserVerifyEmail from "../Pages/UserVerifyEmail";
import SiteRoutes from "../Routes/SiteRoutes";
import { Container } from "@mui/material";
import ErrorBoundary from "../HOC/ErrorBoundary";
import { Route, Routes } from "react-router";
import MainPage from "../Pages/MainPage/MainPage";

function Main() {
  const { user } = useContext(AuthContext);

  return (

    <Routes>
      <Route path="/">
        <Route index element={
          <MainPage />
        } />
        <Route path="*" element={
          <>
            <MenuSite />
            <Container>
              <ErrorBoundary >
                {(!user?.emailVerified && user?.providerId === "firebase")
                  ? <UserVerifyEmail />
                  : <SiteRoutes />
                }
              </ErrorBoundary>
            </Container>
            <Footer />
            <Header />
          </>
        } />
      </Route>
    </Routes>


  )
}

export default Main;