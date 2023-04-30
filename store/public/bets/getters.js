const getters = {
  getMatches(state) {
    return state.matches.map((match) => ({
      id: match.id,
      ...match.attributes,
      matchName: `${match.attributes.homeTeamName} - ${match.attributes.awayTeamName}`,
    }));
  },
};

export default getters;
