import React, { useEffect, useReducer } from 'react';
import sportReducer from './Reducers/SportReducer';
import Events from './Components/Events';
import data from './DB/test-assignment.json';

const App: React.FC = () => {
  const [sports, sportsDispatch] = useReducer(sportReducer, {
    sportName: [],
    currentSport: ''
  });

  useEffect(() => {
    sportsDispatch({ type: 'GET_SPORTS', data: data });
  }, []);

  const updateCurrentSport = () => {
    sportsDispatch({ type: 'UPDATE_CURRENT_SPORT', sport: sports.sportName });
  }

  return (
    <div>
      {sports && sports.sportName && sports.sportName.length > 0
        ? <div>
          <Events data={data} currentSport={sports.currentSport} />
          <button onClick={updateCurrentSport}>Next</button>
        </div>
        : <div>Sucessfully Voted!!</div>
      }
    </div>
  );
}

export default App;
