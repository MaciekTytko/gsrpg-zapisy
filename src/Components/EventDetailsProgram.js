import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Paper, Button, Stack, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router";
import { useDataBase_ReadProgram } from "../Hooks/useDataBase";

function EventsDetailsProgram(props) {
  const navigator = useNavigate();
  const programList = useDataBase_ReadProgram(props.id);
  const usersCurrent = 1;

  const gotoAddSession = () => {
    navigator('/events/addProgram/' + props.id);
  }

  return (
    <>
      <Box sx={{ textAlign: 'right', mr: 1, mb: 2 }}>
        <Button
          variant='contained'
          color="secondary"
          onClick={gotoAddSession}
        >
          Dodaj własną sesję
        </Button>
      </Box>
      <Stack spacing={2}>
        {programList && Object.entries(programList).map((program) => (
            <Box key={program[0]} sx={{ display: (program[1].approved ? 'flex' : 'none'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Accordion sx={{ minHeight: 50, width: '100%' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="body1">{program[1].title + ' - [' + program[1].system + ']'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {program[1].picsURL && <img src={program[1].picsURL} className="rounded" style={{ maxHeight: '30vh' }} alt="obrazek" />}
                  <Typography variant="h6" sx={{ textAlign: 'left' }}>Opis sesji</Typography>
                  <Typography variant="body2" sx={{ mb: 3, textAlign: 'left' }}>{program[1].desc} </Typography>
                  {program[1].type && <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Typ sesji:</b> {program[1].type.join(', ')}</Typography>}
                  <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Klimat sesji:</b> {program[1].vibe}</Typography>
                  {program[1].triggers && <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Triggery:</b> {program[1].triggers.join(', ')}</Typography>}
                  <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Minimalny wiek gracza:</b> {program[1].userAgeMin}+</Typography>
                  {program[1].otherInfo && <Typography variant="body2" sx={{ mt: 3, textAlign: 'left' }}>{program[1].otherInfo}</Typography>}
                </AccordionDetails>
              </Accordion>

              <Box sx={{ height: 50, display: 'flex', flexDirection: 'row' }}>
                <Paper sx={{ width: 50, p: 1, textAlign: 'center' }}>{usersCurrent + '/' + program[1].usersCountMax}</Paper>
                <Button sx={{ width: 150 }} variant='contained'>
                  zapisz się
                </Button>
              </Box>
            </Box>
          ))}

      </Stack>

    </>
  )
}

export default EventsDetailsProgram;