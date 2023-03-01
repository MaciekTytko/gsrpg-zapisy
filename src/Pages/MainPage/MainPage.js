import { Box, Container, } from "@mui/material";
import Footer from "../../Containers/Footer";
import Header from "../../Containers/Header";
import DicePage from "./DicePage";
import Events from "./Events";


export default function MainPage() {



  return (
    <>

      <DicePage />

      <Container>
        <Events />
      </Container>
      <Footer />
      <Header />
    </>
  )
}