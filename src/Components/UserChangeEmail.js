import { Box, Typography, TextField, Button, DialogActions, DialogTitle, Dialog, DialogContent, Alert, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useAuth_SendEmailVerification, useAuth_signInWithEmailAndPassword } from "../Hooks/useAuth";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import InfoBarContext from "../Context/InfoBarContext";
import EmailPasswordForm from "./EmailPasswordForm";
import * as yup from 'yup';
import { useAuth_writeEmail } from "../Hooks/useAuth";


const emailValidationSchema = yup.object({
  email: yup
    .string('Wpisz adres email')
    .email('Wpisz poprawny email')
    .required('Email jest wymagany'),
});

function UserChangeEmail() {
  const { user, reloadUser } = useContext(AuthContext);
  const infoBar = useContext(InfoBarContext);
  const [email, setEmail] = useState({
    value: user.email,
    openDialog: false,
    validateErrors: [],
    trigger: false,
  })
  const [showLogin, setShowLogin] = useState(false);
  const [writeEmail, loadingWritingEmail, errorWritingEmail] = useAuth_writeEmail();
  const [login, loadingLogin, errorLogin] = useAuth_signInWithEmailAndPassword();
  const [sendVerificationEmail] = useAuth_SendEmailVerification();

  const openDialog = () => setEmail({ ...email, openDialog: true, trigger: false });
  const closeDialog = () => {
    setEmail({ ...email, openDialog: false });
    setShowLogin(false);
  };
  const onClickChange = async () => {
    setEmail({ ...email, trigger: true });
    if (email.validateErrors.length === 0) setShowLogin(true);
  }
  const changeEmail = async (values) => {
    const resultErrorLogin = await login(values.email, values.password);
    if (!resultErrorLogin) {
      const resultErrorWriteEmail = await writeEmail(email.value);
      resultErrorWriteEmail
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Błąd zmiany adresu email' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Twój adres email został zmieniony' }) || closeDialog();
      reloadUser();
      sendVerificationEmail();
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
          disabled={loadingWritingEmail ? true : false}
          onClick={openDialog}
        >
          {loadingWritingEmail ? <CircularProgress /> : 'Zmień'}
        </Button>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={email.openDialog}
          onClose={closeDialog}
        >
          <DialogTitle><Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            Zmień email
            <IconButton aria-label="close" onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
          </DialogTitle>
          <DialogContent>
            {showLogin
              ? <>
                <Typography
                  variant="body">
                  Potwierdź aktualne dane logując się ponownie na konto
                </Typography>
                {errorLogin && <Alert severity="error">Nie można potwierdzić, sprawdź login i hasło</Alert>}
                <EmailPasswordForm
                  submit={changeEmail}
                  loading={loadingLogin}
                  buttonText="Potwierdź zmianę maila"
                  buttonColor="error"
                />
              </>
              : <>
                <Typography
                  variant="body">
                  Wpisz nowy adres e-mail.<br />Operacja wymaga ponownej autentykacji.
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={email.value}
                  onChange={(event) => validateEmail(event.target.value)}
                  error={email.trigger && email.validateErrors?.length > 0}
                  helperText={email.trigger && email.validateErrors?.[0]}
                />
              </>
            }
          </DialogContent>
          {!showLogin && <DialogActions>
            <Button onClick={closeDialog}>Anuluj</Button>
            <Button color="warning" variant="contained" onClick={onClickChange}>Zmień</Button>
          </DialogActions>
          }
        </Dialog>
      </Box>
    </>
  )
}

export default UserChangeEmail;