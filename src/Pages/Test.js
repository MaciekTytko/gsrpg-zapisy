import { Box, Button, } from "@mui/material";
import { useNavigate } from "react-router";
import { useDataBase_ReadEvents } from "../Hooks/useDataBase";

function Test() {
  const eventList = useDataBase_ReadEvents();
  const navigator = useNavigate();

  const sorter = (a,b) =>{
    return a[1].date < b[1].date
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
      {Object.entries(eventList).sort(sorter).map((eKey, iKey) => (
        <p key={iKey}>{JSON.stringify(eKey[1])}</p>
      ))}
    </>
  )
}

export default Test;