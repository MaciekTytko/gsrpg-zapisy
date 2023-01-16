import { Alert, Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { useAuth_SendEmailVerification, useAuth_signOut } from "../Hooks/useAuth";
import { useContext } from "react";
import { useNavigate } from "react-router";
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";

function UserVerifyEmail() {
  const infoBar = useContext(InfoBarContext);
  const navigator = useNavigate();
  const [sendVerificationEmail, loading, error] = useAuth_SendEmailVerification();
  const [logout, loadingLogout] = useAuth_signOut();

  const logoutAndRedirectToLoginPage = async () => {
    await logout();
    navigator('/login');
  }
  const sendEmail = async ()=>{
    const resultError = await sendVerificationEmail();
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można wysłać emaila, spróbuj później' })
      : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Wysłano email' });
  }

  return (
    <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

        <Typography
          variant="h4">
          Trwa weryfikacja adresu email
        </Typography>
        {error && <Alert severity="error">Nie można wysłać emaila. Spróbuj później</Alert>}
        <ForwardToInboxTwoToneIcon color="primary" sx={{ fontSize: 80, m: 2 }} />
        <Typography
          variant="body"
          align="left">
          Sprawdź swoją skrzynkę email w poszukiwaniu emaila z linkiem potwierdzającym rejestrację w serwisie.
          Po potwierdzeniu emaila zaloguj się ponownie.
        </Typography>
        <Button
          sx={{ mt: 2 }}
          variant={loadingLogout ? "outlined" : "contained"}
          disabled={loadingLogout}
          fullWidth
          onClick={logoutAndRedirectToLoginPage}
        >
          Zaloguj się ponownie
        </Button>
        <Box sx={{ mt: 2, width:'100%', display: 'flex', justifyContent: 'right' }}>
          <Typography
            variant="body2"
            sx={{ mr: 1 }}
          >
            Nie dostałeś emaila?
          </Typography>
          <Link
            component="button"
            variant="body2"
            disabled={loading}
            onClick={sendEmail}
            underline="none"
          >
            Wyślij email jeszcze raz
          </Link>
        </Box>
      </Paper>
    </Container >
  )
}
export default UserVerifyEmail;