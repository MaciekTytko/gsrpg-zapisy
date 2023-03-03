import { Box, Container, IconButton } from "@mui/material";
import ExternalLink from "@mui/material/Link"
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import discordIcon from "../Assets/Logo/discord-mark-black.svg"
import "./Footer.scss"

function Footer() {
  return (
    <div className="Foot d-print-none">
      <Container>
        <Box sx={{ pt: '30px', display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <p>O serwisie</p>
            <p>Polityka prywatności</p>
            <p>Materiały promocyjne</p>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <ExternalLink href="http://www.ligazmg.pl">Liga ZMG</ExternalLink>
            <Link to="/contact">Kontakt</Link>
            <Box>
              <IconButton aria-label="discord">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="facebook">
                <discordIcon/>
              </IconButton>
            </Box>
          </Box>
        </Box>
        <p>Made by Maciek for Liga ZMG</p>
      </Container>
    </div>
  )
}

export default Footer;