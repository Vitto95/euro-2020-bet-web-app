const getters = {
  getMatches(state) {
    return state.matches.map((match) => ({
      id: match.id,
      ...match.attributes,
      matchName: `${match.attributes.homeTeamName} - ${match.attributes.awayTeamName}`,
    }));
  },

  getMatch(state) {
    return { id: state.match.id, ...state.match.attributes };
  },
};

export default getters;
