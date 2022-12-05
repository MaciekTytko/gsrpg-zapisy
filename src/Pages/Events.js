import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, Paper, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useNavigate } from "react-router";

function Events() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  return (
    <>
      <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Spotkania RPG - Grudzień 2022</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventsList />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Warsztaty RPG</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>Treść wydarzenia</div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Planszówki mikołajkowe - Grudzień 2022</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>Treść wydarzenia</div>
        </AccordionDetails>
      </Accordion>
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
      onClick={()=>navigator('addSession')}
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