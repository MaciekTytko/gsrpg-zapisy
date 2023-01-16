import { Box, Typography, Button, DialogActions, DialogTitle, Dialog, DialogContent, Alert, Link, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useAuth_signInWithEmailAndPassword, useAuth_deleteAccount } from "../Hooks/useAuth";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import InfoBarContext from "../Context/InfoBarContext";
import EmailPasswordForm from "./EmailPasswordForm";
import { useNavigate } from "react-router";

function UserDeleteAccount() {
  const user = useContext(AuthContext);
  const navigator = useNavigate();
  const infoBar = useContext(InfoBarContext);
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [sendDeleteAccount, loadingDelete, errorDelete] = useAuth_deleteAccount();
  const [login, loadingLogin, errorLogin] = useAuth_signInWithEmailAndPassword();

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const deleteAccount = async (values) => {
    const resultErrorLogin = await login(values.email, values.password);
    if (!resultErrorLogin) {
      const resultErrorDelete = await sendDeleteAccount();
      resultErrorDelete
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można usunąć konta' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Twoje konto zostało usunięte' }) || navigator('/');
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        {errorDelete && <Alert severity="error">Nie można połączyć z bazą danych - sprawdź swoje połączenie</Alert>}
        <Link
          component="button"
          variant="body2"
          onClick={openDialog}
          underline="none"
        >
          Usuń konto
        </Link>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={open}
          onClose={closeDialog}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              Usuń konto
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
                  Potwierdź login i hasło
                </Typography>
                {errorLogin && <Alert severity="error">Nie można potwierdzić, sprawdź login i hasło</Alert>}
                <EmailPasswordForm
                  submit={deleteAccount}
                  loading={loadingLogin}
                  buttonText="Potwierdź usunięcie"
                  buttonColor="error"
                />
              </>
              : <Typography
                variant="body">
                Czy na pewno chcesz usunąć konto?<br />Operacja wymaga ponownej autentykacji.
              </Typography>
            }
          </DialogContent>
          {!showLogin && <DialogActions>
            <Button onClick={closeDialog}>Anuluj</Button>
            <Button color="error" variant="contained" onClick={() => setShowLogin(true)}>Usuń</Button>
          </DialogActions>
          }
        </Dialog>
      </Box>
    </>
  )
}

export default UserDeleteAccount;