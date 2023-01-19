import { Container, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import EventForm from "../Components/EventForm";
import { useDataBase_EditEvent } from '../Hooks/useDataBase';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import EventContext from "../Context/EventContext";

function EventEdit() {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const [events, loadingReadEvent, errorReadEvent] = useContext(EventContext);
  const [editEvent, loading, error] = useDataBase_EditEvent();
  const { eventID } = useParams();

  const submit = async (values) => {
    const resultError = await editEvent(eventID, values);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można edytować eventu' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Event zmieniony' });
    if (!resultError) navigator('/manage');
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Edytuj wydarzenie
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        {errorReadEvent && <Alert severity="error">Nie można pobrać informacji o evencie, sprawdź później</Alert>}
        {error && <Alert severity="error">Nie można edytować Eventu</Alert>}
        {loadingReadEvent 
        ? <CircularProgress/>
        : <EventForm
          submit={submit}
          loading={loading}
          initialValues={events?.[eventID]}
        />
        }
      </Paper>

    </Container >
  );
}

export default EventEdit;