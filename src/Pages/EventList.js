import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import EventsDetails from "../Components/EventDetails";
import EventContext from "../Context/EventContext"

//const monthsList = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

function EventList() {
  const [expanded, setExpanded] = useState(-1);
  const eventList = useContext(EventContext);
  const navigator = useNavigate();
  const { id } = useParams();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  const sorter = (a, b) => {
    return a[1].date < b[1].date
  }

  useEffect(() => {
    setExpanded(id);
  }, [id])

  return (
    <>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button
          variant='contained'
          color="secondary"
          onClick={() => navigator('/events/addEvent')}
        >
          Dodaj wydarzenie
        </Button>
      </Box>
      {Object.entries(eventList).sort(sorter).map((event, index) => (
        //<p key={i}>{JSON.stringify(eTime) + '  - ' + JSON.stringify(eventList[eKey])}</p>
        <Accordion
          key={event[0]}
          expanded={expanded === event[0]}
          onChange={handleChange(event[0])}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">{`${event[1].title} [${dayjs(event[1].date).format('DD-MM-YYYY')}]`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventsDetails
              eventId={event[0]}
              title={event[1].title}
              desc={event[1].desc}
              picsURL={event[1].picsURL}
              date={event[1].date}
              allowRegister={event[1].allowRegister}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export default EventList;
