import React, { useEffect, useReducer } from 'react';
import sportReducer from './Reducers/SportReducer';
import Events from './Components/Events';
import data from './DB/test-assignment.json';
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  border: 2px solid #3DADC5;
  background-color: #3DADC5;
  color: #fff;
  width: 140px;
  height: 50px;
  line-height: 46px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 11px;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 0;
  box-shadow: none;
  outline: 0;
  background-clip: border-box;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: 95vw;
  margin: 0px auto;
  background-color: #536381;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
  @media only screen and (min-width: 1024px) {
    width: 35vw;
  }
`;

const Note = styled.p`
  font-size: 9px;
  width: 100%;
  margin: 0px auto;
  text-align: center;
  color: white;
  font-weight: bold;
`;


const EndNote = styled.div`
  color: #FFB100;
  width: 95%;
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
          <ButtonWrapper>
            <Button onClick={updateCurrentSport}>Next</Button>
            <Note>(Refresh or Click this button to load next category..)</Note>
          </ButtonWrapper>
        </div>
        : <EndNote>You have successfully visited all categories..Thanks for voting!!!!</EndNote>
      }
    </div>
  );
}

export default App;
