import { Alert, Box, Button, Skeleton, Stack, } from "@mui/material";
import { useNavigate } from "react-router";
import { useDataBase_ReadPrograms, useDataBase_ReadRegistrations,useDataBase_AddProgramRegistration, useDataBase_RemoveProgramRegistration} from "../Hooks/useDataBase";
import ProgramDetails from "./ProgramDetails";

function EventsDetailsProgram(props) {
  const navigator = useNavigate();
  const [programList, loadingProgram, errorProgram] = useDataBase_ReadPrograms(props.eventId);
  const [registerList, loadingRegistration, errorRegistration] = useDataBase_ReadRegistrations(props.eventId);
  const [addProgramRegistration, loading1, error1] = useDataBase_AddProgramRegistration();
  const [removeProgramRegistration, loading2, error2] = useDataBase_RemoveProgramRegistration();
  const gotoAddSession = () => {
    navigator('/events/addProgram/' + props.eventId);
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
      {(errorProgram || errorRegistration) && <Alert severity="error">Nie wczytać listy sesji<br />sprawdź swoje połączenie</Alert>}
      {(error1 || error2) && <Alert severity="error">Nie można zmienić zapisów na sesję<br />sprawdź później</Alert>}
      <Stack direction="column" spacing={{ xs: 5,  md: 2 }} mb={3}>
        {loadingProgram || loadingRegistration
          ? <><Skeleton /><Skeleton /><Skeleton /></>
          : programList && Object.entries(programList).map(([programID,program], index) => (
            <ProgramDetails
              key={index}
              eventId={props.eventId}
              programID={programID}
              program={program}
              registerList={registerList}
              funcAddRegistration={addProgramRegistration}
              funcRemoveRegistration={removeProgramRegistration}
              loadingButton={loading1||loading2}
            />
          ))}
      </Stack>

    </>
  )
}

export default EventsDetailsProgram;