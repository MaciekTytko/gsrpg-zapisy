import { Container, Paper, Typography, Alert } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import EventForm from "../Components/EventForm";
import { useDataBase_AddEvent } from '../Hooks/useDataBase';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";

function EventAdd() {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const [addEvent, loading, error] = useDataBase_AddEvent();

  const submit = async (values) => {
    const resultError = await addEvent(values);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można dodać eventu' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Event dodany do bazy' });
    if (!resultError) navigator('/manage');
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Dodaj nowe wydarzenie
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        {error && <Alert severity="error">Nie można dodać Eventu</Alert>}
        <EventForm
          submit={submit}
          loading={loading}
        />
      </Paper>

    </Container >
  );
}

export default EventAdd;