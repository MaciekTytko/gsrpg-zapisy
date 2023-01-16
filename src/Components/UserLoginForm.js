import { Box, Typography, Alert, Link } from "@mui/material";
import { useContext } from "react";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import { useAuth_signInWithEmailAndPassword } from '../Hooks/useAuth';
import EmailPasswordForm from "./EmailPasswordForm";
import { useNavigate } from "react-router";


function UserLoginForm(props) {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const [signIn, loading, error] = useAuth_signInWithEmailAndPassword();

  const login = async (values) => {
    const resultError = await signIn(values.email, values.password);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zalogować użytkownika, sprawdź login i hasło' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Zalogowano użytkownika' });
    props.loginResult(resultError);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Typography
          sx={{ m: 2 }}
          variant="h5">
          Zaloguj się
        </Typography>
      </Box>

      <Box>
        {error && <Alert severity="error">Nie można zalogować użytkownika, sprawdź login i hasło</Alert>}
        <EmailPasswordForm
          submit={login}
          loading={loading}
          buttonText="Zaloguj"
        />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'right' }}>
        <Typography
          variant="body2"
          sx={{ mr: 1 }}
        >
          Nie masz konta?
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigator('/register');
          }}
          underline="none"
        >
          Zarejestruj się
        </Link>
      </Box>
    </>
  )
}

export default UserLoginForm;