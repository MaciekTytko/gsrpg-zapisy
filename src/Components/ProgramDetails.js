import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProgramRegisterButton from "./ProgramRegisterButton";


function ProgramDetails(props) {
  const program = props.program;

  return (
    <Box sx={{ display: (program.approved ? 'flex' : 'none'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Accordion sx={{ minHeight: 50, width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">{program.title + ' - [' + program.system + ']'}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          {program.picsURL && <img src={program.picsURL} className="rounded" style={{ maxHeight: '30vh' }} alt="obrazek" />}
          <Typography variant="subtitle">Opis sesji</Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>{program.desc} </Typography>
          {program.type && <Typography variant="body2" ><b>Typ sesji:</b> {program.type.join(', ')}</Typography>}
          <Typography variant="body2" ><b>Klimat sesji:</b> {program.vibe}</Typography>
          {program.triggers && <Typography variant="body2"><b>Triggery:</b> {program.triggers.join(', ')}</Typography>}
          <Typography variant="body2"><b>Minimalny wiek gracza:</b> {program.userAgeMin}+</Typography>
          {program.otherInfo && <Typography variant="body2" sx={{ mt: 3 }}>{program.otherInfo}</Typography>}
        </AccordionDetails>
      </Accordion>
      <ProgramRegisterButton
        programID={props.programID}
        program={props.program}
        registerList={props.registerList}
        eventId={props.eventId}
      />

    </Box>
  )
}

export default ProgramDetails;