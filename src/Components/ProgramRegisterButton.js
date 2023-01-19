import { Box, Paper, Button, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";

function ProgramRegisterButton(props) {
  const infoBar = useContext(InfoBarContext);
  const { user } = useContext(AuthContext);
  const programId = props.programID;
  const program = props.program;
  const usersCurrent = props.registerList ? Math.min(Object.keys(props.registerList?.[programId] || {}).length, program.usersCountMax) : 0;

  const fullUsers = usersCurrent >= program.usersCountMax;
  const userRegisterOnEvent = JSON.stringify(props.registerList).indexOf(user?.uid) > 0;
  const userRegisterOnProgram = (
    Object.keys(props.registerList?.[programId] || {})
      .reduce((userExist, reg) => { return userExist || reg === user?.uid }, false)
  )

  const programRegistration = async () => {
    const resultError = await props.funcAddRegistration(props.eventId, programId, user?.uid)
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zapisać na sesję, spróbuj później' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Zapisany :)' });
  }
  const programRegistrationRemove = async () => {
    const resultError = await props.funcRemoveRegistration(props.eventId, programId, user?.uid)
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Ups.. Coś się posypało w bazie, spróbuj później' })
      : infoBar.dispatch({ type: infoBarAction.WARNING, message: 'Zrezygnowałeś z udziału :(' });
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
        onClick={userRegisterOnProgram ? programRegistrationRemove : programRegistration}
        disabled={!user || fullUsers || (userRegisterOnEvent && !userRegisterOnProgram) || props.loadingButton}
      >
        {userRegisterOnProgram ? 'zrezygnuj' : 'zapisz się'}
      </Button>
    </Box>
  )
}

export default ProgramRegisterButton;