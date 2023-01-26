import { Container, Paper, Typography } from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';

function ErrorInReactUpsPage() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: { xs: 1, md: 600 }, p: 2, mb: 2, mt: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h2'>
          Ups... Coś poszło nie tak
        </Typography>
        <ReportIcon color="error" sx={{ fontSize: 80, m: 2 }} />
        <Typography
          variant="body">
          Przeładuj stronę i zacznij swój quest jeszcze raz.
        </Typography>
      </Paper>
    </Container>
  )
}

export default ErrorInReactUpsPage;