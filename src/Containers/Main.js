
import { useContext } from "react";
import Header from "./Header";
import MenuSite from "./MenuSite";
import Footer from "./Footer";
import AuthContext from '../Context/AuthContext';
import UserVerifyEmail from "../Pages/UserVerifyEmail";
import SiteRoutes from "../Routes/SiteRoutes";
import { Container } from "@mui/material";
import ErrorBoundary from "../HOC/ErrorBoundary";

function Main() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <MenuSite />
      <Container>
        <ErrorBoundary >
        {(!user?.emailVerified && user?.providerId === "firebase")
          ? <UserVerifyEmail />
          : <SiteRoutes/>
        }
        </ErrorBoundary>
      </Container>
      <Footer />
      <Header />
    </>
  )
}

export default Main;