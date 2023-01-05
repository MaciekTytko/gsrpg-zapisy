import { Box, Paper, Typography, Button, Container, Grid } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function UserProfile() {
  const user = useContext(AuthContext);

  

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{ m: 2 }}
        variant="h4">
        Profil użytkownika
      </Typography>
      <Paper sx={{ width: 600, p: 2, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Grid sx={{ mb: 2, }} container spacing={2}>
          <Grid item xs={8}>
            <Paper sx={{
              mr: 2, pl: 2, pr: 2, height: '100%', minWidth: 200,
              display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
            }}>
              <Typography>{user.email}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              zmień email
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ mb: 2, }} container spacing={2}>
          <Grid item xs={8}>
            <Paper sx={{
              mr: 2, pl: 2, pr: 2, height: '100%', minWidth: 200,
              display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
            }}>
              <Typography># # # # # # # #</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained">
              zmień hasło
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            onClick={() => navigator('events')}
          >Przejdź do listy wydarzeń</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserProfile;