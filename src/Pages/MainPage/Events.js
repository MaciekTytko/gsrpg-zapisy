import { Alert, Box, createTheme, responsiveFontSizes, ThemeProvider, Typography } from "@mui/material";
import { useContext } from "react";
import EventCard from "../../Components/EventCard";
import EventCardSkeleton from "../../Components/EventCardSkeleton";
import EventContext from "../../Context/EventContext";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function Events() {
  const [eventList, loading, error] = useContext(EventContext);

  const sorter = (a, b) => {
    return a[1].date < b[1].date
  }

  return (
    <>  

      {/* TODO make this in global THEME */}
      <ThemeProvider theme={theme}>
        <Typography variant="h2" >Gliwickie wydarzenia RPG</Typography>
        <Typography variant="body1" gutterBottom>Sprawdź co RPGowego czeka Cię w tym miesiącu!</Typography>
      </ThemeProvider>
      <Box sx={{
        //bgcolor: '#cfe8fc',
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }} >
        {error && <Alert severity="error">Nie można połączyć z bazą danych by wczytać wydarzenia <br/> sprawdź swoje połączenie</Alert>}
        {loading
          ? <> <EventCardSkeleton /><EventCardSkeleton /><EventCardSkeleton /></>
          : Object.entries(eventList).sort(sorter).map(([id, event], index) => (
            <EventCard
              key={index}
              id={id}
              title={event.title}
              desc={event.desc}
              picsURL={event.picsURL}
              date={event.date}
              allowRegister={event.allowRegister}
            />
          ))
        }
      </Box>
    </>
  )
}

export default Events;