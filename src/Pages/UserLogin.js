import { Container, Paper, Typography } from "@mui/material";
import UserLoginForm from "../Components/UserLoginForm";

function UserLogin() {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Logowanie
      </Typography>
      <Paper sx={{ width: {xs: 1, md: 600}, p: 2, mb: 2}}>
        <UserLoginForm/>
      </Paper>
      
    </Container >
  );
}

export default UserLogin;