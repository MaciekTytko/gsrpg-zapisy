import { Box, Typography, TextField, Button, DialogActions, DialogTitle, Dialog, DialogContent, Alert, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { AuthContext, AuthReloadContext } from "../Context/AuthContext";
import { useAuth_signInWithEmailAndPassword, useAuth_writePassword } from "../Hooks/useAuth";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import InfoBarContext from "../Context/InfoBarContext";
import EmailPasswordForm from "./EmailPasswordForm";
import * as yup from 'yup';

const passwordValidationSchema = yup.object({
  password: yup
    .string('Wpisz hasło')
    .min(8, 'Hasło musi mieć minimum 8 znaków')
    .required('Hasło jest wymagane'),
});

function UserChangePassword() {
  const reloadUser = useContext(AuthReloadContext);
  const user = useContext(AuthContext);
  const infoBar = useContext(InfoBarContext);
  const [password, setPassword] = useState({
    value: '',
    openDialog: false,
    validateErrors: [],
    trigger: false,
  })
  const [showLogin, setShowLogin] = useState(false);
  const [writePassword, loadingWritingPassword, errorWritingPassword] = useAuth_writePassword();
  const [login, loadingLogin, errorLogin] = useAuth_signInWithEmailAndPassword();

  const openDialog = () => setPassword({ ...password, openDialog: true, trigger: false });
  const closeDialog = () => {
    setPassword({ ...password, openDialog: false });
    setShowLogin(false);
  };
  const onClickChange = async () => {
    setPassword({ ...password, trigger: true });
    if (password.validateErrors.length === 0) setShowLogin(true);
  }
  const changePassword = async (values) => {
    const resultErrorLogin = await login(values.email, values.password);
    if (!resultErrorLogin) {
      const resultErrorWritePassword = await writePassword(password.value);
      resultErrorWritePassword
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Błąd zmiany hasła' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Hasło zostało zmienione' }) || closeDialog();
      reloadUser();
    }
  }


  const validatePassword = async (value) => {
    const newPassword = { ...password };
    newPassword.value = value;
    await passwordValidationSchema.validate({ password: value })
      .then(() => newPassword.validateErrors = [])
      .catch(err => newPassword.validateErrors = err.errors);
    setPassword(newPassword);
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {(errorWritingPassword) && <Alert severity="error">Nie można połączyć z bazą danych - sprawdź swoje połączenie</Alert>}
        <TextField
          disabled
          fullWidth
          sx={{ m: 1 }}
          label="Hasło"
          value="#########"
        />

        <Button
          sx={{ m: 1 }}
          variant={loadingWritingPassword ? "outlined" : "contained"}
          disabled={loadingWritingPassword ? true : false}
          onClick={openDialog}
        >
          {loadingWritingPassword ? <CircularProgress /> : 'Zmień'}
        </Button>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={password.openDialog}
          onClose={closeDialog}
        >
          <DialogTitle><Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            Zmień hasło
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
                  submit={changePassword}
                  loading={loadingLogin}
                  buttonText="Potwierdź zmianę hasła"
                  buttonColor="error"
                />
              </>
              : <>
                <Typography
                  variant="body">
                  Wpisz nowe hasło.<br />Operacja wymaga ponownej autentykacji.
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Hasło"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={password.value}
                  onChange={(event) => validatePassword(event.target.value)}
                  error={password.trigger && password.validateErrors?.length > 0}
                  helperText={password.trigger && password.validateErrors?.[0]}
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

export default UserChangePassword;