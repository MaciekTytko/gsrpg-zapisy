import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UserRegisterForm from "../Components/UserRegisterForm";

function UserRegister(){
  const navigator = useNavigate();

  const loginResult = (resultError) => {
    if(!resultError) navigator('/user');
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Zarejestruj się
      </Typography>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2 }}>
        <UserRegisterForm loginResult={loginResult} />
      </Paper>

    </Container >
  );
}

export default UserRegister;