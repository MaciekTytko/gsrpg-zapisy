import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import wyvernImage from "../Assets/MainPage/Wyvern.jpg"
import diceImage from "../Assets/Backgrounds/DiceBackground.jpg"
import Events from "./Events";

const mainPageTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main: '#fff'
    }
  },
});

export default function MainPage() {



  return (
    <>
      <Box
        sx={{
          backgroundColor: "#201f25",
          height: "100VH",
          // height: 'calc(100VH - 450px)',
          // minHeight: '300px',
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            height: "100%",
          }}>
          <img
            style={{ height: "100%" }}
            src={wyvernImage}
            alt={"Wyvern"}
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={mainPageTheme}>
            <Typography variant="h1" color="textPrimary">Gliwickie RPG</Typography>
            <Typography variant="body1" color="textPrimary">Znajdź najlepsze wydarzenia</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" color="primary">ZOBACZ WYDARZENIA</Button>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
      <Box>
        <Events />
      </Box>

    </>
  )
}