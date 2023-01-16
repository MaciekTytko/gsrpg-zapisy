import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import UserRegisterForm from "../Components/UserRegisterForm";
import InfoBarContext from "../Context/InfoBarContext";
import { useAuth_SendEmailVerification } from "../Hooks/useAuth";
import { infoBarAction } from "../Reduce/InfoBarReducer";

function UserRegister() {
  const navigator = useNavigate();
  const infoBar = useContext(InfoBarContext);
  const [sendVerificationEmail, loading] = useAuth_SendEmailVerification();

  const loginResult = async (resultError) => {
    if (!resultError) {
      const resultError = await sendVerificationEmail();
      resultError
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można wysłać emaila, spróbuj później' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Wysłano email z weryfikacją' });
      navigator('/user');
    }
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Zarejestruj się
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        {loading
          ? <CircularProgress />
          : <UserRegisterForm loginResult={loginResult} />
        }
      </Paper>

    </Container >
  );
}

export default UserRegister;