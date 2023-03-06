import { AppBar, Box, Button, Toolbar, Typography, Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useContext } from "react";
import backgroundImage from "../../Assets/Backgrounds/DiceBackground.jpg"
import MenuSiteUserAvatar from "../../Components/MenuSiteUserAvatar";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import logoImage from "../../Assets/Logo/LigaZMG_Logo_03_kwadrat2.png"

const AppBarHeight = 80;

export default function DicePage() {
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();

  const gotoEventsList = () => navigator('events');

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{
        minHeight: AppBarHeight,
        backgroundColor: '#201f25',
        justifyContent: 'center'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Typography
            variant="h3"
            color="white"
            fontWeight="800"
            sx={{ fontSize: 36 }}
          >
            GLIWICKIE RPG
          </Typography>
          <Box sx={{ flex: 1, display: {xs:'flex', md: 'none'}}} />
          <Box sx={{ flex: 1, display: {xs:'none', md: 'flex'}, justifyContent: 'flex-end' }}>
            {user && <MenuSiteUserAvatar />}
          </Box>
        </Toolbar>
      </AppBar>


      <Box sx={{ height: '100VH', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
        {/* Background */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: -2,
            height: '100%',
            width: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: 'black',
          }}
        />

        {/* Logo */}
        <Box position="absolute" top={AppBarHeight + 10} sx={{display: {xs:'none', md: 'block'}}}>
          <img
            src={logoImage}
            alt="logo LigiZMG"
            height={120}
            width={120}
          />
        </Box>
        
        {/* Texts and buttons */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            backgroundColor: 'transparent',
          }}>
          <Container
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: "space-between",
            }}>
            <Box sx={{ height: AppBarHeight }} />
            <Box>
              <Typography
                variant="h1"
                color="white"
                fontWeight="800"
                sx={{  mt: 2, mb: 5 }}>
                Wydarzenia RPG
              </Typography>

              <Typography
                variant="h4"
                color="white"
                fontWeight="400"
                sx={{  mt: 2, mb: 4 }}>
                Zobacz co RPGowego dzieje się w twojej okolicy
              </Typography>

              <Button variant="contained" size="large" onClick={gotoEventsList}>
                Zobacz wydarzenia
              </Button>

              <Typography
                variant="body1"
                color="white"
                fontWeight="400"
                sx={{  mt: 1.5 }}>
                Zagraj w coś fajnego
              </Typography>
            </Box>
            <Box>
              <KeyboardDoubleArrowDownIcon sx={{ color: "white", fontSize: 30, m: 2 }} />
            </Box>
          </Container>
        </Box>
      </Box>

    </>
  )
}