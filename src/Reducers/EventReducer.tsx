
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

interface State {
  currentEvents: Data[],
  currentEvent: Data
}

type Actions =
  | { type: 'GET_EVENTS'; data: Data[]; currentSport: string }
  | { type: 'GET_NEXT_EVENT'; events: Data[] };

const eventReducer = (state: State, action: Actions) => {
  switch (action.type) {

    case 'GET_EVENTS':
      let getEvents = action.data.filter((event) => event.sport === action.currentSport);
      const getOne = getEvents[0];
      const filterEvents = getEvents.filter((event) => event.name !== getOne.name)
      return {
        ...state, currentEvents: filterEvents, currentEvent: getOne
      };

    case 'GET_NEXT_EVENT':
      const getOneEvent = action.events[0];
      const remainingEvents = action.events.filter((event) => event.name !== getOneEvent.name)
      return {
        ...state, currentEvent: getOneEvent, currentEvents: remainingEvents
      };
  }
}
export default eventReducer;