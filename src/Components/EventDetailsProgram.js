import { Box, Button, Stack, } from "@mui/material";
import { useNavigate } from "react-router";
import { useDataBase_ReadProgram, useDataBase_ReadRegister } from "../Hooks/useDataBase";
import ProgramDetails from "./ProgramDetails";

function EventsDetailsProgram(props) {
  const navigator = useNavigate();
  const programList = useDataBase_ReadProgram(props.eventId);
  const registerList = useDataBase_ReadRegister(props.eventId);
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
      <Stack spacing={2}>
        {programList && Object.entries(programList).map((program, i) => (
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