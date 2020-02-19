import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import eventReducer from '../reducers/EventReducer';
import EventCard from './EventCard';

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

const EndNote = styled.div`
  color: #FFB100;
  width: 90%;
  font-family: "Patua One";
  text-align: center;
  font-size: 14px;
  animation: blinkingText 3s infinite;
  margin-top: 20vw;
  padding: 20px;
  
  @keyframes blinkingText{
    0%{     color:  #FFB100;    }
    60%{    color: transparent; }
    100%{   color:  #FFB100;    }
}
`;

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
  }, [currentSport, data]);

  const loadNextEvent = () => {
    setTimeout(() => {
      eventsDispatch({ type: 'GET_NEXT_EVENT', events: events.currentEvents });
    }, 3000)
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
        :
        <EndNote>You have successfully voted for all events in this category. Please click next or refresh the page to continue with another category!!</EndNote>

      }
    </div>
  );
}

export default Events;
