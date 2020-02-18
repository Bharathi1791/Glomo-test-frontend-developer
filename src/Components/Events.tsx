import React, { useEffect, useReducer } from 'react';
import eventReducer from '../Reducers/EventReducer';
import EventCard from './EventCard'

interface Data {
  awayName: string,
  createdAt: string,
  group: string,
  homeName: string,
  id: number,
  name: string,
  objectId: string,
  sport: string,
  country: string,
  state: string
}

interface Props {
  currentSport: string,
  data: Data[]
}

const Events: React.FC<Props> = ({ currentSport, data }) => {

  const [events, eventsDispatch] = useReducer(eventReducer, {
    currentEvents: [],
    currentEvent: {
      awayName: '',
      createdAt: '',
      group: '',
      homeName: '',
      id: 0,
      name: '',
      objectId: '',
      sport: '',
      country: '',
      state: ''
    }
  });

  useEffect(() => {
    eventsDispatch({ type: 'GET_EVENTS', data: data, currentSport: currentSport });
  }, [currentSport]);

  const loadNextEvent = () => {
    setTimeout(() => {
      eventsDispatch({ type: 'GET_NEXT_EVENT', events: events.currentEvents });
    }, 2000)
  }

  return (
    <div>
      {events && events.currentEvent && events.currentEvent.name
        ? <EventCard
          awayName={events.currentEvent.awayName}
          homeName={events.currentEvent.homeName}
          group={events.currentEvent.group}
          name={events.currentEvent.name}
          createdAt={events.currentEvent.createdAt}
          id={events.currentEvent.id}
          objectId={events.currentEvent.objectId}
          sport={events.currentEvent.sport}
          country={events.currentEvent.country}
          state={events.currentEvent.state}
          handleClick={loadNextEvent}
        />
        : 'Currently no event available to vote! Please click '
      }
    </div>
  );
}

export default Events;
