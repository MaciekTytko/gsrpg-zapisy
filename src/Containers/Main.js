
import { useContext } from "react";
import { Box, Container } from "@mui/material";
import MenuSite from "./MenuSite";
import Footer from "./Footer";
import AuthContext from '../Context/AuthContext';
import UserVerifyEmail from "../Pages/UserVerifyEmail";
import SiteRoutes from "../Routes/SiteRoutes";
import ErrorBoundary from "../HOC/ErrorBoundary";

function Main() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{minHeight:'100VH',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
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
    </Box>
  )
}

export default Main;