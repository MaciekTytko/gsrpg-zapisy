import {  Box, Button, Card, CardMedia} from "@mui/material";
import { useState } from "react";

function EventsDetailsHeader(props) {
  const [expandedDesc, setExpandedDesc] = useState(false);
  const maxDescLine = 6;
  const eventDesc = props.desc.split('\n');

  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row' }}>
      {props.picsURL && <Box sx={{ mr: 3, maxWidth: 300 }}>
        <Card >
          <CardMedia
            component="img"
            image={props.picsURL}
            alt="Podgląd obrazka"
          />
        </Card>
      </Box>
      }
      <Box sx={{ m: 0, textAlign: 'start' }}>
        {eventDesc.map((text, i) => {
          if (expandedDesc) return <p key={i} style={{ margin: 0 }}>{text}</p>;
          else if (i < maxDescLine) return <p key={i} style={{ margin: 0 }}>{text}</p>;
          else if (i === maxDescLine) return <Button key={i} onClick={() => setExpandedDesc(true)}>Rozwiń opis</Button>;
          else return null;
        })}
        {expandedDesc && <Button onClick={() => setExpandedDesc(false)}>Zwiń opis</Button>}
      </Box>
    </Box>
  )
}

export default EventsDetailsHeader;