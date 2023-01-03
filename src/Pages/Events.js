import { Box } from "@mui/material";
import EventCard from "../Components/EventCard";
import { useDataBase_ReadEvents } from "../Hooks/useDataBase";

function Events() {
  const eventList = useDataBase_ReadEvents();

  const sorter = (a, b) => {
    return a[1].date < b[1].date
  }

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
        Object.entries(eventList).sort(sorter).map((event, index) => (
          <EventCard
            key={index}
            id={event[0]}
            title={event[1].title}
            desc={event[1].desc}
            picsURL={event[1].picsURL}
            date={event[1].date}
            allowRegister={event[1].allowRegister}
          />
        ))}
    </Box>
  )
}

export default Events;