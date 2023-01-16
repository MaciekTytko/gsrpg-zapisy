import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";


function UserNotLogin() {
  const navigator = useNavigate();
  return (
    <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{ m: 2 }}
        variant="h2">
        Nie jesteś zalogowany
      </Typography>
      <Box sx={{ mt: 2, width: {xs: 1, md: 600}, display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="contained"
          onClick={() => navigator('/login')}
        >
          Zaloguj się
        </Button>
      </Box>
    </Container>

  )
}

export default UserNotLogin;