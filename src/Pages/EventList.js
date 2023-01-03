import { Box } from "@mui/material";
import EventCard from "../Components/EventCard";
import { useDataBase_ReadEvents } from "../Hooks/useDataBase";

function EventList() {
  const eventList = useDataBase_ReadEvents();


  return (
    <Box sx={{
      //bgcolor: '#cfe8fc',
      padding: '20px 20px',
      display: 'flex',
      flexDirection: 'row', //TODO row-reverse
      flexWrap: 'wrap', //TODO wrap-reverse
      justifyContent: 'space-evenly',

    }} >
      {
        Object.values(eventList).map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            desc={event.desc}
            picsURL={event.picsURL}
            date={event.date}
            allowRegister={event.allowRegister}
          />
      ))}
    </Box>
  )
}

export default EventList;