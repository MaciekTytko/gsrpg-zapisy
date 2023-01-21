import { Button, Container, Paper, Typography } from "@mui/material";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { useNavigate } from "react-router";

function NotFound404() {
  const navigator = useNavigate();

  const gotoMainPage = () => navigator('/');
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2, mt: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h2'>
          Błąd 404
        </Typography>
        <CrisisAlertIcon color="error" sx={{ fontSize: 80, m: 2 }} />
        <Typography
          variant="body">
          To nie jest strona której szukałeś. <br/>Wróć do strony głównej i zacznij swój quest jeszcze raz.
        </Typography>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="error"
          fullWidth
          onClick={gotoMainPage}
        >
          Wróć do strony głównej
        </Button>
      </Paper>
    </Container>
  )
}

export default NotFound404;