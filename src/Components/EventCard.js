import * as React from 'react';
import { CardActionArea, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import eventCover from '../Assets/EventImages/GSRPG_cover.png'

function EventCard(props){
  const navigator = useNavigate();
  const eventDesc = props.desc.split('\n');
  
  const gotoEvent = ()=>{
    navigator('events/'+props.id);
  }

  return (
    <Card sx={{ width: 300, margin: '20px' }}>
      <CardActionArea onClick={gotoEvent}>
        <CardMedia
          component="img"
          height="150"
          image={props.picsURL || eventCover}
          alt="Obrazek wydarzenia"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
          <Typography type="date" variant="subtitle1">
            {`${props.date.substring(8,10)}-${props.date.substring(5,7)}-${props.date.substring(0,4)} ${props.date.substring(11,16)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {eventDesc[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EventCard;