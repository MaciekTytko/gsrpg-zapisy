import { Box, Paper, Button, Typography, } from "@mui/material";
import { useDataBase_AddProgramRegister } from "../Hooks/useDataBase";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function ProgramRegisterButton(props) {
  const { register, registerDelete } = useDataBase_AddProgramRegister();
  const user = useContext(AuthContext);
  const programId = props.program[0];
  const program = props.program[1];
  const usersCurrent = props.registerList ? Math.min(Object.keys(props.registerList?.[programId] || {}).length, program.usersCountMax) : 0;

  const fullUsers = usersCurrent >= program.usersCountMax;
  const userRegisterOnEvent = JSON.stringify(props.registerList).indexOf(user?.uid) > 0;
  const userRegisterOnProgram = (
    Object.keys(props.registerList?.[programId] || {})
      .reduce((userExist, reg) => { return userExist || reg === user?.uid }, false)
  )

  // Registration user to program.
  const programRegistration = () => {
    register(props.eventId, programId, user?.uid)
  }
  const programRegistrationDelete = () => {
    registerDelete(props.eventId, programId, user?.uid)
  }
  return (
    <Box sx={{ height: 50, display: 'flex', flexDirection: 'row' }}>
      <Paper sx={{ width: 50, p: 1, textAlign: 'center' }}>
        <Typography variant="body2" >
          {usersCurrent + '/' + program.usersCountMax}
        </Typography>
      </Paper>
      <Button
        sx={{ width: 150 }}
        color={userRegisterOnProgram ? 'error' : 'primary'}
        variant={userRegisterOnProgram || !user ? 'outlined' : 'contained'}
        onClick={userRegisterOnProgram ? programRegistrationDelete : programRegistration}
        disabled={!user || fullUsers || (userRegisterOnEvent && !userRegisterOnProgram)}
      >
        {userRegisterOnProgram ? 'zrezygnuj' : 'zapisz się'}
      </Button>
    </Box>
  )
}

export default ProgramRegisterButton;