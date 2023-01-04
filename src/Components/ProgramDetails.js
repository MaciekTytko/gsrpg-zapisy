import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Paper, Button, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDataBase_AddProgramRegister } from "../Hooks/useDataBase";
import { useAuthUserData } from "../Hooks/useAuth"

function ProgramDetails(props) {
  const { register, registerDelete} = useDataBase_AddProgramRegister();
  const userData = useAuthUserData();
  const programId = props.program[0];
  const program = props.program[1];
  const usersCurrent = props.registerList ? Math.min(Object.keys(props.registerList?.[programId] || {}).length, program.usersCountMax) : 0;


  const fullUsers = usersCurrent >= program.usersCountMax;
  const userRegisterOnEvent = JSON.stringify(props.registerList).indexOf(userData.uid) > 0;
  const userRegisterOnProgram = (
    Object.keys(props.registerList?.[programId] || {})
      .reduce((userExist, reg) => { return userExist || reg === userData.uid }, false)
  )

  // Registration user to program.
  const programRegistration = () => {
    register(props.eventId, programId, userData.uid)
  }
  const programRegistrationDelete = () => {
    registerDelete(props.eventId, programId, userData.uid)
  }

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
        <AccordionDetails>
          {program.picsURL && <img src={program.picsURL} className="rounded" style={{ maxHeight: '30vh' }} alt="obrazek" />}
          <Typography variant="h6" sx={{ textAlign: 'left' }}>Opis sesji</Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'left' }}>{program.desc} </Typography>
          {program.type && <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Typ sesji:</b> {program.type.join(', ')}</Typography>}
          <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Klimat sesji:</b> {program.vibe}</Typography>
          {program.triggers && <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Triggery:</b> {program.triggers.join(', ')}</Typography>}
          <Typography variant="body2" sx={{ textAlign: 'left' }}><b>Minimalny wiek gracza:</b> {program.userAgeMin}+</Typography>
          {program.otherInfo && <Typography variant="body2" sx={{ mt: 3, textAlign: 'left' }}>{program.otherInfo}</Typography>}
        </AccordionDetails>
      </Accordion>

      <Box sx={{ height: 50, display: 'flex', flexDirection: 'row' }}>
        <Paper sx={{ width: 50, p: 1, textAlign: 'center' }}>{usersCurrent + '/' + program.usersCountMax}</Paper>
        <Button
          sx={{ width: 150 }}
          color={userRegisterOnProgram ? 'error' : 'primary'}
          variant={userRegisterOnProgram ? 'outlined' : 'contained'}
          onClick={userRegisterOnProgram ? programRegistrationDelete : programRegistration}
          disabled={fullUsers || (userRegisterOnEvent && !userRegisterOnProgram)}
        >
          {userRegisterOnProgram ? 'zrezygnuj' : 'zapisz się'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProgramDetails;