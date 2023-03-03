import { Container, Link, Paper, Typography } from "@mui/material";

export default function Contact() {

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ width: { xs: 1, md: 440 }, p: 2, mb: 2, mt: 4, display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant='h4'>
          Kontakt
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Stowarzyszenie Liga ZMG
        </Typography>

        <table className="table table-responsive" style={{ textAlign: 'left', tableLayout: 'auto' }}>
          <tbody>
            <tr key="GM">
              <td>Kontakt dla MG</td>
              <td>
                <Link href="mailto: vataxar@ligazmg.pl" color="inherit" underline="hover">
                  vataxar@ligazmg.pl
                </Link>
              </td>
            </tr>
            <tr key="Refounds">
              <td>Sekretariat</td>
              <td>
                <Link href="mailto: mactator@ligazmg.pl" color="inherit" underline="hover">
                  mactator@ligazmg.pl
                </Link>
              </td>
            </tr>
            <tr key="IT">
              <td>Dział IT</td>
              <td>
                <Link href="mailto: karol@ligazmg.pl" color="inherit" underline="hover">
                  karol@ligazmg.pl
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <Typography variant="body2" >
          Najszybciej porozmawiasz z nami na <Link href="https://discord.gg/dT99qFz3z7" color="inherit">
            Discordzie Ligi ZMG
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}