import { Box, Typography, Button, TextField, Skeleton, Alert } from "@mui/material";
import { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {AuthContext, AuthReloadContext} from "../Context/AuthContext";
import { useDataBase_WriteUserData, useDataBase_ReadUserData } from "../Hooks/useDataBase";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import { fbaseAuth } from "../Firebase/Firebase";

const validationSchema = yup.object({
  displayName: yup
    .string('Podaj ksywę')
    .required('Ksywa jest wymagana byśmy mogli się spotkać'),
  contact: yup
    .string('Podaj kontakt do siebie')
    .required('Podaj kontakt do siebie telefon, mail, facebook, discord'),
  photoURL: yup
    .string('Podaj Link do Avatara')
    .url('To nie jest poprawny Link'),
});

function UserDataForm() {
  const user = useContext(AuthContext);
  const reloadUser = useContext(AuthReloadContext);
  const infoBar = useContext(InfoBarContext);
  const [initialValues, loadingReadDB, errorReadDB] = useDataBase_ReadUserData(user.uid);
  const [writeUserDataToDB, loadingWriteDB, errorWriteDB] = useDataBase_WriteUserData();

  const sendData = async (values) => {
    const resultError = await writeUserDataToDB(user.uid, values, user.email);
    reloadUser();
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Błąd zapisu do bazy danych' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Twoje dane zostały zapisane w bazie' })
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Twoje dane
        </Typography>
      </Box>

      <Box>
        {(errorReadDB || errorWriteDB) && <Alert severity="error">Nie można połączyć z bazą danych - sprawdź swoje połączenie</Alert>}
        {loadingReadDB
          ? <><Skeleton /><Skeleton /><Skeleton /></>
          : <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              id="displayName"
              name="displayName"
              label="Ksywa"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={formik.touched.displayName && Boolean(formik.errors.displayName)}
              helperText={formik.touched.displayName && formik.errors.displayName}
            />
            <TextField
              fullWidth
              margin="dense"
              id="contact"
              name="contact"
              label="Kontakt"
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
            />
            <TextField
              fullWidth
              margin="dense"
              id="photoURL"
              name="photoURL"
              label="Link do avatara"
              value={formik.values.photoURL}
              onChange={formik.handleChange}
              error={formik.touched.photoURL && Boolean(formik.errors.photoURL)}
              helperText={formik.touched.photoURL && formik.errors.photoURL}
            />
            <Button
              sx={{ mt: 2 }}
              variant={loadingWriteDB ? "outlined" : "contained"}
              disabled={loadingWriteDB ? true : false}
              fullWidth type="submit">
              {loadingWriteDB ? 'Zapisywanie...' : 'Zapisz'}
            </Button>
          </form>
        }
      </Box>

    </>
  )
}

export default UserDataForm;