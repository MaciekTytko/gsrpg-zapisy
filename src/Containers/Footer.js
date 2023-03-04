import { Box, Container, createSvgIcon, createTheme, IconButton, ThemeProvider, Typography } from "@mui/material";
import MUILink from "@mui/material/Link"
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import "./Footer.scss"
import { discordLink, facebookLink } from "../Assets/Links/importantLinks";
import ligaImage from "../Assets/Backgrounds/LigaZMG_Logo_04_PasekMailing22.png";

const DiscordIcon = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" /></g></g></g></svg>,
  'Home',
);

const footerTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function Footer() {
  return (
    <div className="Foot d-print-none">
      <Box sx={{height:{xs: 'auto', md: '170px'}, width:{xs: '100%', md: 'auto'}}}>
        <img src={ligaImage} alt="liga ZMG cover" height="100%" width="100%"/>
      </Box>
      <Box>
        <ThemeProvider theme={footerTheme}>
          <Box sx={{
            pt: '30px',
            display: 'flex',
            justifyContent: 'space-around',
            gap: 10
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: 1 }}>
              <RouterLink to="/termsAndConditions" className="Link">
                Regulamin
              </RouterLink>
              <RouterLink to="/privacyPolicy" className="Link">
                Polityka prywatności
              </RouterLink>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: 1 }}>
              <MUILink href="http://www.ligazmg.pl" color="textPrimary" underline="hover">
                Liga ZMG
              </MUILink>
              <RouterLink to="/contact" className="Link">
                Kontakt
              </RouterLink>
              <Box>
                <IconButton aria-label="facebook" href={facebookLink}>
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="discord" href={discordLink} >
                  <DiscordIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Typography variant="subtitle1" color="textPrimary">© 2023 by  Maciek for Liga ZMG</Typography>
        </ThemeProvider>
      </Box>
    </div>
  )
}

export default Footer;