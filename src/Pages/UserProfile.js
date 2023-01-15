import { Typography, Container, Paper } from "@mui/material";
import UserDataForm from "../Components/UserDataForm";
import UserAccountDetails from "../Components/UserAccountDetails";



function UserProfile() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Profil użytkownika
      </Typography>
      <Paper sx={{ width: {xs: 1, md: 600}, p: 2, mb: 2}}>
        <UserAccountDetails/>
      </Paper>
      <Paper sx={{ width: {xs: 1, md: 600}, p: 2}}>
        <UserDataForm />
      </Paper>
      
    </Container >
  )
}

export default UserProfile;