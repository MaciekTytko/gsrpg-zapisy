import EventsDetailsHeader from "./EventDetailsHeader";
import EventsDetailsProgram from "./EventDetailsProgram";


function EventsDetails(props) {
  return (
    <>
      <EventsDetailsHeader
        desc={props.desc}
        picsURL={props.picsURL}
      />
      <EventsDetailsProgram
      id={props.id}
      />     
    </>
  )
}

export default EventsDetails;