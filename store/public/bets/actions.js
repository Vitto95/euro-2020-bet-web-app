const actions = {
  async fetchFootballMatches({ commit }) {
    let response = await this.$axios.get("api/admin/v1/matches?past=1");
    commit("setFootballMatches", response.data.data);
  },
};

export default actions;
