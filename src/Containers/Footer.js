import { Box, Container } from "@mui/material";
import "./Footer.scss"

function Footer() {
  return (
    <div className="Foot d-print-none">
      <Container>
        <Box sx={{ pt:'30px', display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <p>O serwisie</p>
            <p>Polityka prywatności</p>
          </Box>
          <Box>
            <p>Liga ZMG</p>
            <p>Kontakt</p>
            <p>sociale</p>
          </Box>
        </Box>
        <p>Made by Maciek for Liga ZMG</p>
      </Container>
    </div>
  )
}

export default Footer;