import { Container, Paper, Typography, Alert } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { useDataBase_AddProgram } from '../Hooks/useDataBase';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import EventContext from "../Context/EventContext";
import ProgramForm from "../Components/ProgramForm";

function EventAdd() {
  const infoBar = useContext(InfoBarContext);
  const [events] = useContext(EventContext);
  const navigator = useNavigate();
  const { eventID } = useParams();
  const [addProgram, loading, error] = useDataBase_AddProgram();

  const submit = async (values) => {
    const resultError = await addProgram(eventID, values);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można dodać sesji. Skontaktuj się z administratorem' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Sesja dodana do wydarzenia' });
    if (!resultError) navigator('/events/'+eventID);
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ mt: 2 }}
        variant="h4">
        Dodaj nową sesję
      </Typography>
      <Typography
        sx={{ m: 1 }}
        variant="h6">
        {events?.[eventID]?.title}
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        {error && <Alert severity="error">Nie można dodać Eventu</Alert>}
        <ProgramForm
          submit={submit}
          loading={loading}
        />
      </Paper>

    </Container >
  );
}

export default EventAdd;