import { Accordion, AccordionDetails, AccordionSummary, Typography, Skeleton, Alert } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import EventsDetails from "../Components/EventDetails";
import EventContext from "../Context/EventContext"

function EventList() {
  const [expanded, setExpanded] = useState(-1);
  const [eventList, loading, error] = useContext(EventContext);
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
      <Typography variant="h2" >Gliwickie wydarzenia RPG</Typography>
      <Typography variant="body1" gutterBottom>Sprawdź co RPGowego czeka Cię w tym miesiącu!</Typography>
      {error && <Alert severity="error">Nie można połączyć z bazą danych by wczytać wydarzenia <br /> sprawdź swoje połączenie</Alert>}
      {loading
        ? <> <Skeleton/><Skeleton/><Skeleton/></>
        : Object.entries(eventList).sort(sorter).map(([eventID, event], index) => (
          <Accordion
            key={eventID}
            expanded={expanded === eventID}
            onChange={handleChange(eventID)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"content-"+eventID}
              id={"header-"+eventID}
            >
              <Typography variant="h6">{`${event.title} [${dayjs(event.date).format('DD-MM-YYYY')}]`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EventsDetails
                eventId={eventID}
                title={event.title}
                desc={event.desc}
                picsURL={event.picsURL}
                date={event.date}
                allowRegister={event.allowRegister}
              />
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  )
}

export default EventList;
