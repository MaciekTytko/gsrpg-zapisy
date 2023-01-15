import { Box, Paper, Typography, Button, Container, TextField, DialogActions, DialogTitle, Dialog, DialogContent, Alert, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import * as yup from 'yup';
import { useAuthSignOut, useAuth_writeEmail } from "../Hooks/useAuth";
import { useAuthChangeUserData } from '../Hooks/useAuth';
import UserDataForm from "./UserDataForm";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import InfoBarContext from "../Context/InfoBarContext";



function UserAccountDetails() {
  const user = useContext(AuthContext);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Twoje konto
        </Typography>
      </Box>
      {user.providerId === "firebase" && <Firebase />}
    </>
  )
}

export default UserAccountDetails;


const emailValidationSchema = yup.object({
  email: yup
    .string('Wpisz adres email')
    .email('Wpisz poprawny email')
    .required('Email jest wymagany'),
});

function Firebase() {
  const user = useContext(AuthContext);
  const infoBar = useContext(InfoBarContext);
  const [email, setEmail] = useState({
    value: user.email,
    openDialog: false,
    validateErrors: [],
    trigger: false,
  })
  const [writeEmail, loadingWritingEmail, errorWritingEmail] = useAuth_writeEmail();

  const openEmailDialog = () => setEmail({ ...email, openDialog: true, trigger: false });
  const closeEmailDialog = () => setEmail({ ...email, openDialog: false });
  const changeEmail = async () => {
    setEmail({ ...email, trigger: true });
    if (email.validateErrors.length === 0) {
      closeEmailDialog();
      await writeEmail(email.value);
      errorWritingEmail
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Błąd zmiany adresu email' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Twój adres email został zmieniony' })
    }
  }
  const validateEmail = async (value) => {
    const newEmail = { ...email };
    newEmail.value = value;
    await emailValidationSchema.validate({ email: value })
      .then(() => newEmail.validateErrors = [])
      .catch(err => newEmail.validateErrors = err.errors);
    setEmail(newEmail);
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {(errorWritingEmail) && <Alert severity="error">Nie można połączyć z bazą danych - sprawdź swoje połączenie</Alert>}
        <TextField
          disabled
          fullWidth
          sx={{ m: 1 }}
          label="E-mail"
          value={user.email}
        />

        <Button
          sx={{ m: 1 }}
          variant={loadingWritingEmail ? "outlined" : "contained"}
          onClick={openEmailDialog}
        >
          {loadingWritingEmail ? <CircularProgress /> : 'Zmień'}
        </Button>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={email.openDialog}
          onClose={closeEmailDialog}
        >
          <DialogTitle>Zmień email</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email.value}
              onChange={(event) => validateEmail(event.target.value)}
              error={email.trigger && email.validateErrors?.length > 0}
              helperText={email.trigger && email.validateErrors?.[0]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEmailDialog}>Anuluj</Button>
            <Button onClick={changeEmail}>Zmień</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}