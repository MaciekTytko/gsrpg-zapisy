import { Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import EventCard from "../Components/EventCard";

function EventList() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  return (
    <div>
      <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Grudzień</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventBox />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Listopad</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventBox />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Październik</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventBox />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

function EventBox() {
  return (
    <>
      <Box sx={{
        bgcolor: '#cfe8fc',
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'row', //TODO row-reverse
        flexWrap: 'wrap', //TODO wrap-reverse
        justifyContent: 'space-evenly',

      }} >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />

      </Box>
    </>
  )
}


export default EventList;