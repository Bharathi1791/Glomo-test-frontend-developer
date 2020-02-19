import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import voteReducer from '../reducers/VoteReducer';
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
  color: #FFB100;
`;

const Card = styled.div`
  width: 95vw;
  margin: auto;
  margin-top: 4vh;
  border-radius: 5px;
  @media only screen and (min-width: 1024px) {
    width: 35vw;
  }
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
    color: #a9bed8;
    background: #38445D;
    height: 8vh;
`;

const Image = styled.img`
    margin-left: 5px;
`;

const Heading = styled.div`
  width: 80%;
  text-align: center;
 
  @media only screen and (min-width: 768px) {
    width: 100%;
    padding-right: 100px;
  }
  @media only screen and (min-width: 1024px) {
    width: 100%;
    padding-right: 50px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
  background-color: #475672;
  height: 50vh;
  color: #ffffff;
`;

const Group = styled.div`
  font-family: "Press Start 2P", "Roboto";
  font-size: 12px;
  color: #3DADC5;
  font-weight: bold;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  width: 60%;
  @media only screen and (min-width: 768px) {
    width: 40%;
  }
  @media only screen and (min-width: 1024px) {
    width: 40%;
  }
`;

const Option = styled.div`
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

const InputCheckBox = styled.input`
  padding: 5px;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 80%;
  color: #fff;
  font-weight: bolder;
  font-family: "Patua One";
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
    }, 100);
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
          <OptionsWrapper>
            <Option>
              <InputCheckBox
                type="checkbox"
                checked={votes.isChecked.teamA}
                disabled={votes.isDisabled.teamA}
                value="teamA"
                onChange={addVote}
              />
              <div>{props.homeName}(TeamA) win</div>
            </Option>
            <Option>
              <InputCheckBox
                type="checkbox"
                disabled={votes.isDisabled.draw}
                checked={votes.isChecked.draw}
                value="draw"
                onChange={addVote}
              />
              <div>Draw</div>
            </Option>
            <Option>
              <InputCheckBox
                type="checkbox"
                disabled={votes.isDisabled.teamB}
                checked={votes.isChecked.teamB}
                value="teamB"
                onChange={addVote}
              />
              <div>{props.awayName}(TeamB) win</div>
            </Option>
          </OptionsWrapper>
          {votes && votes.showResult
            ? <ResultWrapper>
              <p>Team A ({votes.resultDetail.teamA})</p>
              <p>Draw ({votes.resultDetail.draw})</p>
              <p>Team B ({votes.resultDetail.teamB})</p>
            </ResultWrapper>
            : <div></div>
          }
        </Section>
      </Card>
    </div>
  );
};

export default EventCard;