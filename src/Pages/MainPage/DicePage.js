import { AppBar, Box, Button, Toolbar, Typography, Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useContext } from "react";
import backgroundImage from "../../Assets/Backgrounds/DiceBackground.jpg"
import MenuSiteUserAvatar from "../../Components/MenuSiteUserAvatar";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router";

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
            variant="h1"
            color="white"
            fontWeight="800"
            sx={{ fontSize: 36 }}
          >
            GLIWICKIE RPG
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {user && <MenuSiteUserAvatar />}
          </Box>
        </Toolbar>
      </AppBar>


      <Box sx={{ height: "100VH", display: "flex", flexDirection: "column" }}>
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
                variant="h2"
                color="white"
                fontWeight="800"
                sx={{ fontSize: 90, mt: 2, mb: 5 }}>
                Wydarzenia RPG
              </Typography>

              <Typography
                variant="h2"
                color="white"
                fontWeight="400"
                sx={{ fontSize: 32, mt: 2, mb: 4 }}>
                Zobacz co RPGowego dzieje się w twojej okolicy
              </Typography>

              <Button variant="contained" size="large" onClick={gotoEventsList}>
                Zobacz wydarzenia
              </Button>

              <Typography
                variant="h2"
                color="white"
                fontWeight="400"
                sx={{ fontSize: "1rem", mt: 1.5 }}>
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