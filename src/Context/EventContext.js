import React from 'react'

const EventContext = React.createContext([{}, false, false]);

EventContext.displayName = "EventContext"

export default EventContext;