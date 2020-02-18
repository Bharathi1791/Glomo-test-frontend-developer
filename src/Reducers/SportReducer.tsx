
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
  sportName: string[],
  currentSport: string
}

type Actions =
  | { type: 'GET_SPORTS'; data: Data[] }
  | { type: 'UPDATE_CURRENT_SPORT'; sport: string[] };

const sportReducer = (state: State, action: Actions) => {
  type StringArray = Array<string>;
  switch (action.type) {
    case 'GET_SPORTS':
      const listSportNames: StringArray = [];
      action.data.map(list => {
        if (!listSportNames.includes(list['sport'])) listSportNames.push(list['sport']);
        return listSportNames;
      });
      const getRandomSport = listSportNames[Math.floor(Math.random() * listSportNames.length)];
      const filterSportName = listSportNames.filter((current) => current !== getRandomSport);
      return {
        ...state, sportName: filterSportName, currentSport: getRandomSport
      };

    case 'UPDATE_CURRENT_SPORT':
      const sportName = action.sport[0];
      const getSportName = action.sport.filter((current) => current !== sportName);
      return {
        ...state, currentSport: sportName, sportName: getSportName
      };
  }
}

export default sportReducer;