const actions = {
  async fetchFootballMatches({ commit }, status) {
    let response = await this.$axios.get(`api/v1/matches?${status}=1`);
    commit("setFootballMatches", response.data.data);
  },
};

export default actions;
