
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import EventCard from "../Components/EventCard";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function EventList() {
  return (
    <div>






      
      <Typography variant="h2" sx={{textAlign: 'left'}}>Grudzień</Typography>
      <Box sx={{
        bgcolor: '#cfe8fc',
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'row', //TODO row-reverse
        flexWrap: 'wrap', //TODO wrap-reverse
        justifyContent: 'space-evenly',

      }} >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />

      </Box>
      <Typography variant="h2" sx={{textAlign: 'left'}}>Listopad</Typography>
      <Box sx={{
        bgcolor: '#cfe8fc',
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'row', //TODO row-reverse
        flexWrap: 'wrap', //TODO wrap-reverse
        justifyContent: 'space-evenly',

      }} >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />

      </Box>
    </div>
  )
}
export default EventList;