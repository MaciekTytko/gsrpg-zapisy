import { Alert, Box, Button, Skeleton, Stack, } from "@mui/material";
import { useNavigate } from "react-router";
import { useDataBase_ReadPrograms, useDataBase_ReadRegistrations } from "../Hooks/useDataBase";
import ProgramDetails from "./ProgramDetails";

function EventsDetailsProgram(props) {
  const navigator = useNavigate();
  const [programList, loadingProgram, errorProgram] = useDataBase_ReadPrograms(props.eventId);
  const [registerList, loadingRegistration, errorRegistration] = useDataBase_ReadRegistrations(props.eventId);
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
      <Stack spacing={2}>
        {loadingProgram || loadingRegistration
          ? <><Skeleton /><Skeleton /><Skeleton /></>
          : programList && Object.entries(programList).map((program, i) => (
            <ProgramDetails
              key={i}
              eventId={props.eventId}
              program={program}
              registerList={registerList}
            />
          ))}
      </Stack>

    </>
  )
}

export default EventsDetailsProgram;