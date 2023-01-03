import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, Paper, Button, Card, CardMedia, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDataBase_ReadEvents } from "../Hooks/useDataBase";
import dayjs from "dayjs";

//const monthsList = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

function Events() {
  const [expanded, setExpanded] = useState(-1);
  const eventList = useDataBase_ReadEvents();
  const navigator = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  const sorter = (a, b) => {
    return a.date < b.date
  }

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
      {Object.values(eventList).sort(sorter).map((event, index) => (
        //<p key={i}>{JSON.stringify(eTime) + '  - ' + JSON.stringify(eventList[eKey])}</p>
        <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">{`${event.title} [${dayjs(event.date).format('DD-MM-YYYY')}]`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventsDetails
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

function EventsDetails(props) {
  const navigator = useNavigate();
  const [expandedDesc, setExpandedDesc] = useState(false);
  const maxDescLine = 6;
  const eventDesc = props.desc.split('\n');

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row' }}>
        {props.picsURL && <Box sx={{ mr: 3, maxWidth: 300 }}>
          <Card >
            <CardMedia
              component="img"
              image={props.picsURL}
              alt="Podgląd obrazka"
            />
          </Card>
        </Box>
        }
        <Box sx={{ m: 0, textAlign: 'start' }}>
          {eventDesc.map((text, i) => {
            if (expandedDesc) return <p key={i} style={{ margin: 0 }}>{text}</p>;
            else if (i < maxDescLine) return <p key={i} style={{ margin: 0 }}>{text}</p>;
            else if (i === maxDescLine) return <Button key={i} onClick={() => setExpandedDesc(true)}>Rozwiń opis</Button>;
            else return null;
          })}
          {expandedDesc && <Button onClick={() => setExpandedDesc(false)}>Zwiń opis</Button>}
        </Box>
      </Box>


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