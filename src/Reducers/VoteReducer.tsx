
interface Votes {
  objectId: string,
  teamA: number,
  draw: number,
  teamB: number,
  total?: number
}

interface BoolenObject {
  teamA: boolean,
  draw: boolean,
  teamB: boolean,
}

interface State {
  eventVotes: Votes[],
  isDisabled: BoolenObject,
  isChecked: BoolenObject,
  showResult: Boolean,
  resultDetail: any
}

type Actions =
  | { type: 'ADD_VOTE'; objectId: string; team: string }
  | { type: 'IS_DISABLED'; team: string }
  | { type: 'SHOW_RESULT'; objectId: string; }
  | { type: 'RESET'; };

const voteReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const findVotes = state.eventVotes.find((event) => event.objectId === action.objectId);
      if (findVotes === undefined) {
        let newEvent: Votes = {
          objectId: action.objectId,
          teamA: action.team === 'teamA' ? 1 : 0,
          draw: action.team === 'draw' ? 1 : 0,
          teamB: action.team === 'teamB' ? 1 : 0
        };
        state.eventVotes.push(newEvent);
      } else {
        state.eventVotes.map((event) => {
          if (event.objectId === action.objectId) {
            event.teamA = action.team === 'teamA' ? event.teamA + 1 : event.teamA
            event.draw = action.team === 'draw' ? event.draw + 1 : event.draw
            event.teamB = action.team === 'teamB' ? event.teamB + 1 : event.teamB
          }
          return state.eventVotes;
        })
      }
      localStorage.setItem('eventVotes', JSON.stringify(state.eventVotes))
      return state;
    case 'IS_DISABLED':
      let disabledObj = {
        teamA: true,
        teamB: true,
        draw: true
      }
      let checkedObj = {
        teamA: false,
        teamB: false,
        draw: false
      }
      if (action.team === 'teamA') {
        checkedObj.teamA = true;
      } else if (action.team === 'draw') {
        checkedObj.draw = true;
      } else if (action.team === 'teamB') {
        checkedObj.teamB = true;
      }
      return {
        ...state, isDisabled: disabledObj, isChecked: checkedObj
      };
    case 'SHOW_RESULT':
      const getResult = state.eventVotes.find((event) => event.objectId === action.objectId);
      let totalVotes = 0;
      if (getResult) {
        totalVotes = getResult.teamA + getResult.draw + getResult.teamB;
        getResult.total = totalVotes;
      }
      return { ...state, showResult: true, resultDetail: getResult }
    case 'RESET':
      let resetObj = {
        teamA: false,
        teamB: false,
        draw: false
      }
      let resetDetail = {
        objectId: '',
        teamA: 0,
        draw: 0,
        teamB: 0,
        total: 0
      }

      return {
        ...state,
        isDisabled: resetObj,
        isChecked: resetObj,
        showResult: false,
        resultDetail: resetDetail,
      };
  }
}

export default voteReducer;