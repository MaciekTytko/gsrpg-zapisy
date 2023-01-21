import { Container, Paper, Typography } from "@mui/material";
import UserLoginForm from "../Components/UserLoginForm";

function AuthErrorLogin() {

  const loginResult = (resultError) => {
    if(!resultError) ;
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Najpierw się zaloguj
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        <UserLoginForm loginResult={loginResult} />
      </Paper>

    </Container >
  );
}

export default AuthErrorLogin;