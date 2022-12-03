import { Box, Container, Typography } from "@mui/material";
import React from "react";
import EventList from "../Pages/EventList";


function Main() {
  return (
    <>
      <Container>
        <Typography variant="h1" >Gliwickie Spotkania RPG</Typography>
        <Typography variant="body1" gutterBottom>Comiesięczne święto erpegowców już dostępne w aplikacji!</Typography>

        <EventList />
      </Container>
    </>
  )
}

export default Main;