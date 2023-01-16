import { Box, Typography, Button, TextField, Skeleton, Alert } from "@mui/material";
import { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthContext from "../Context/AuthContext";
import { useDataBase_WriteUserData, useDataBase_ReadUserData } from "../Hooks/useDataBase";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";

const validationSchema = yup.object({
  nickname: yup
    .string('Podaj ksywę')
    .required('Ksywa jest wymagana byśmy mogli się spotkać'),
  contact: yup
    .string('Podaj kontakt do siebie')
    .required('Podaj kontakt do siebie telefon, mail, facebook, discord'),
  picsURL: yup
    .string('Podaj Link do Avatara')
    .url('To nie jest poprawny Link'),
});

function UserDataForm() {
  const user = useContext(AuthContext);
  const infoBar = useContext(InfoBarContext);
  const [initialValues, loadingReadDB, errorReadDB] = useDataBase_ReadUserData(user.uid);
  const [writeUserDataToDB, loadingWriteDB, errorWriteDB] = useDataBase_WriteUserData();

  const sendData = async (values) => {
    const result = await writeUserDataToDB(user.uid, values, user.email);
    result
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
              id="nickname"
              name="nickname"
              label="Ksywa"
              value={formik.values.nickname}
              onChange={formik.handleChange}
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
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
              id="picsURL"
              name="picsURL"
              label="Link do avatara"
              value={formik.values.picsURL}
              onChange={formik.handleChange}
              error={formik.touched.picsURL && Boolean(formik.errors.picsURL)}
              helperText={formik.touched.picsURL && formik.errors.picsURL}
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