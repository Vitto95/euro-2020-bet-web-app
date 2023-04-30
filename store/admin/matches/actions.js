const actions = {
  async fetchFootballMatches({ commit }) {
    let response = await this.$axios.get("api/admin/v1/matches?past=1");
    commit("setFootballMatches", response.data.data);
  },

  async fetchFootballMatch({ commit }, id) {
    let response = await this.$axios.get(`api/admin/v1/matches/${id}`);
    commit("setFootballMatch", response.data.data);
  },

  async submitResult({ commit }, match) {
    let response = await this.$axios.put(
      `api/admin/v1/matches/${match.matchId}/result`,
      match.result
    );
    commit("setFootballMatch", response.data.data);
  },
};

export default actions;
