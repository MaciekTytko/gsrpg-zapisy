import EventsDetailsHeader from "../Components/EventDetailsHeader";
import EventsDetailsProgram from "../Components/EventDetailsProgram";


function EventsDetails(props) {
  return (
    <>
      <EventsDetailsHeader
        desc={props.desc}
        picsURL={props.picsURL}
      />
      <EventsDetailsProgram
      eventId={props.eventId}
      />     
    </>
  )
}

export default EventsDetails;