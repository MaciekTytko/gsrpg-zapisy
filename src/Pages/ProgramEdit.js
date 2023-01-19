import { Container, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { useDataBase_EditProgram, useDataBase_ReadPrograms } from '../Hooks/useDataBase';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import ProgramForm from "../Components/ProgramForm";

function EventAdd() {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const { eventID, programID } = useParams();
  const [programs, loadingProgram, errorProgram] = useDataBase_ReadPrograms(eventID);
  const [editProgram, loading, error] = useDataBase_EditProgram();

  const submit = async (values) => {
    const resultError = await editProgram(eventID, programID, values);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zmienić sesji. Skontaktuj się z administratorem' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Sesja zmieniona' });
    if (!resultError) navigator('/events/'+eventID);
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ mt: 2 }}
        variant="h4">
        Zmień sesję
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        {errorProgram && <Alert severity="error">Nie można pobrać informacji o evencie, sprawdź później</Alert>}
        {error && <Alert severity="error">Nie można edytować Eventu</Alert>}
        {loadingProgram 
        ? <CircularProgress/>
        : <ProgramForm
          submit={submit}
          loading={loading}
          initialValues={programs?.[programID]}
        />
        }
      </Paper>

    </Container >
  );
}

export default EventAdd;