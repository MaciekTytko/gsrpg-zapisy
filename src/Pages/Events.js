import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, Paper, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDataBase_ReadEvents } from "../Hooks/useDataBase";

const monthsList = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

function Events() {
  const [expanded, setExpanded] = useState(0);
  const eventList = useDataBase_ReadEvents();
  const navigator = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };


  return (
    <>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button
          variant='contained'
          color="secondary"
          onClick={() => navigator('addEvent')}
        >
          Dodaj wydarzenie
        </Button>
      </Box>
      {Object.keys(eventList).reverse().map((eTime, iTime) => (
        Object.keys(eventList[eTime]).map((eKey, iKey) => (
          //<p key={i}>{JSON.stringify(eTime) + '  - ' + JSON.stringify(eventList[eTime][eKey])}</p>
          <Accordion key={eKey} expanded={expanded === iTime * 10 + iKey} onChange={handleChange(iTime * 10 + iKey)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">{`${eventList[eTime][eKey]['title']} - ${monthsList[+eTime.substring(4, 6)]} ${eTime.substring(0, 4)}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {eventList[eTime][eKey]['allowRegister'] 
              ? <p> <EventsList/> </p>
              : <p> {eventList[eTime][eKey]['desc']} </p>}
            </AccordionDetails>
          </Accordion>
        ))

      ))}
    </>
  )
}

export default Events;


const sesje = [
  {
    title: 'Zmierzch',
    desc: 'Dawno temu w trawie...',
    system: 'Warhammer',
    userMax: 4,
    userCurrent: 2,
    sessionType: 'sesja akcji'
  },
  {
    title: 'Jutro nie nadejdzie',
    desc: 'napadacie na bank...',
    system: 'Scion',
    userMax: 5,
    userCurrent: 1,
    sessionType: 'sesja śledztwa'
  },
  {
    title: 'To jest czas',
    desc: 'To jest opis sesji...',
    system: 'D&D 5E',
    userMax: 3,
    userCurrent: 0,
    sessionType: 'dungeoncrawl'
  },
]

function EventsList() {
  const navigator = useNavigate();

  return (
    <>
      <Box sx={{ textAlign: 'right', mr: 1, mb: 2 }}>

        <Button
          variant='contained'
          color="secondary"
          onClick={() => navigator('addSession')}
        >
          Dodaj własną sesję
        </Button>
      </Box>
      {sesje.map((x, index) => (
        <Grid key={index} container spacing={2} sx={{ mb: 0.5 }}>
          <Grid item xs={8}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body1">{x.title + ' - [' + x.system + ']'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ textAlign: 'left' }}>
                  Opis sesji: {x.desc}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'left' }}>
                  Typ sesji: {x.sessionType}
                </Typography>
              </AccordionDetails>
            </Accordion>



          </Grid>
          <Grid item xs={2}>
            <Paper sx={{ p: 1, textAlign: 'center' }}>{x.userCurrent + '/' + x.userMax}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Button variant='contained'>
              zapisz się
            </Button>
          </Grid>
        </Grid>
      ))}

    </>
  )
}