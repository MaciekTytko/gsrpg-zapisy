import { Box, Button, Typography } from "@mui/material";
import backgroundImage from "../../Assets/Backgrounds/DiceBackground.jpg"

const polygonHeight = 260;
const polygonRectangleWidth = 140;

export default function DicePage(){
  return(
    <Box
        sx={{
          height: "100VH",
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "Flex" }}>
          <Box sx={{ height: polygonHeight, width: polygonRectangleWidth }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
              <polygon points="100, 0, 100, 0, 100, 100, 0, 100" fill={`rgba(255, 255, 255, 0.75)`} strokeWidth="0" />
            </svg>
          </Box>
          <Box sx={{ height: polygonHeight, p: 2, backgroundColor: `rgba(255, 255, 255, 0.75)` }}>

            <Typography variant="h1" color="textPrimary">
              Gliwickie RPG
            </Typography>
            <Typography variant="body1" color="textPrimary">Znajdź najlepsze wydarzenia</Typography>
            <Box sx={{ mt: 2 }}>
              <Button size="large" variant="contained" color="primary">ZOBACZ WYDARZENIA</Button>
            </Box>
          </Box>
          <Box sx={{ height: polygonHeight, width: polygonRectangleWidth }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
              <polygon points="0, 0, 100, 0, 0, 100, 0, 100" fill={`rgba(255, 255, 255, 0.75)`} strokeWidth="0" />
            </svg>
          </Box>
        </Box>
      </Box>
  )
}