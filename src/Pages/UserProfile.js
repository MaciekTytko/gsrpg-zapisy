import { Box, Paper, Typography, Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthUserData } from "../Hooks/useAuth";



function UserProfile() {
  const user = useAuthUserData();
  const navigator = useNavigate();

  return (
    <Container sx={{display: 'flex',justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
          sx={{m: 2}}
          variant="h4">
          Profil użytkownika
        </Typography>
      <Paper sx={{width: 600, p:2, m: 1}}>
        <Box sx={{mb: 2, display: 'flex',flexDirection: 'row',justifyContent: 'center' }}>
          <Paper sx={{mr: 2, pl: 2, pr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
        minWidth: 200  }}>
            <Typography>{user.email}</Typography>
          </Paper>
          <Button variant="contained">
            zmień email
          </Button>
        </Box>
        <Box sx={{mb: 2, display: 'flex',flexDirection: 'row',justifyContent: 'center' }}>
          <Paper sx={{mr: 2, pl: 2, pr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
        minWidth: 200  }}>
            <Typography># # # # # # # #</Typography>
          </Paper>
          <Button variant="contained">
            zmień hasło
          </Button>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'right' }}>
        <Button 
        sx={{m: 1}} 
        variant="outlined"
        onClick={()=>navigator('events')}
        >Przejdź do listy wydarzeń</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserProfile;