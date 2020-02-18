import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import voteReducer from '../Reducers/VoteReducer';
import sweden from '../Assets/images/Sweden.png';
import france from '../Assets/images/France.png';
import england from '../Assets/images/England.png';

const countryFlag = [
  { name: 'SWEDEN', image: sweden },
  { name: 'FRANCE', image: france },
  { name: 'ENGLAND', image: england },
];

const PageHeader = styled.h4`
  font-family: "Patua One";
  text-align: center;
  font-weight: bold;
  font-size: 24px;
`;

const Card = styled.div`
 width: 95vw;
 margin: auto;
 box-shadow: -1px -2px 14px 6px rgba(209,209,209,1);
 margin-top: 4vh;
 border-radius: 5px;
`;

const Header = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-family: "Press Start 2P", "Roboto";
    font-size: 10px;
    font-weight: bold;
    width: 100%;
    color: #FF0266;
    background: black;
    height: 8vh;
    margin-bottom: 2vh;
`;

const Image = styled.img`
    margin-left: 5px;
`;

const Heading = styled.div`
  width: 75%;
`;

const Section = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
`;

const Group = styled.div`
  font-family: "Press Start 2P", "Roboto";
  font-size: 12px;
  color: #4A148C;
  font-weight: bold;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  width: 80%;
`;

const Options = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding: 5px;
`;

const Name = styled.div`
  width: 90%;
  padding-top: 20px;
  font-weight: bold;
  text-align: center;
  font-family: "Patua One";
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
`;

interface Props {
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
  handleClick: Function
}

const EventCard: React.FC<Props> = (props) => {

  const findFlag = (countryName: string) => {
    let findimage = countryFlag.find((flag) => flag.name === countryName);
    if (findimage && findimage.image) return findimage.image;
  }

  const getLocalStorage = localStorage.getItem("eventVotes");
  let initialValue = []
  if (getLocalStorage) {
    initialValue = JSON.parse(getLocalStorage);
  }

  const [votes, votesDispatch] = useReducer(voteReducer, {
    eventVotes: initialValue,
    isDisabled: {
      teamA: false,
      draw: false,
      teamB: false,
    },
    isChecked: {
      teamA: false,
      draw: false,
      teamB: false,
    },
    showResult: false,
    resultDetail: {
      objectId: '',
      teamA: 0,
      draw: 0,
      teamB: 0,
      total: 0
    }
  });

  useEffect(() => {
    votesDispatch({ type: 'RESET' })
  }, [props.name]);

  const addVote = (e: any) => {
    votesDispatch({ type: 'ADD_VOTE', objectId: props.objectId, team: e.target.value });
    votesDispatch({ type: 'IS_DISABLED', team: e.target.value })
    setTimeout(() => {
      votesDispatch({ type: 'SHOW_RESULT', objectId: props.objectId })
      props.handleClick();
    }, 2000);
  }
  return (
    <div>
      <PageHeader>GLOMO Sports Poll</PageHeader>
      <Card>
        <Header>
          <Image src={findFlag(props.country)} alt={props.country}></Image>
          <Heading>{props.country} - {props.sport}</Heading>
        </Header>
        <Section>
          <Group>{props.group}</Group>
          <Name>{props.homeName} vs {props.awayName}</Name>
          <OptionWrapper>
            <Options>
              <input
                type="checkbox"
                checked={votes.isChecked.teamA}
                disabled={votes.isDisabled.teamA}
                value="teamA"
                onChange={addVote}
              />
              <div>{props.homeName}(Team A)</div>
            </Options>
            <Options>
              <input
                type="checkbox"
                disabled={votes.isDisabled.draw}
                checked={votes.isChecked.draw}
                value="draw"
                onChange={addVote}
              />
              <div>Draw</div>
            </Options>
            <Options>
              <input
                type="checkbox"
                disabled={votes.isDisabled.teamB}
                checked={votes.isChecked.teamB}
                value="teamB"
                onChange={addVote}
              />
              <div>{props.awayName}(Team B)</div>
            </Options>
          </OptionWrapper>
        </Section>
        <div>
          {votes && votes.showResult
            ? <ResultWrapper>
              <p>Team A - {votes.resultDetail.teamA}</p>
              <p>Team B - {votes.resultDetail.teamB}</p>
              <p>Draw - {votes.resultDetail.draw}</p>
            </ResultWrapper>
            : <div></div>
          }
        </div>
      </Card>

    </div>

  );
};

export default EventCard;