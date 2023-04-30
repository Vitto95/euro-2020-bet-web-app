<template>
  <div class="__admin-matches">
    <nuxt-link to="/admin/matches/new">New match</nuxt-link>
    <CommonButton>Not started</CommonButton>
    <CommonButton>Finished</CommonButton>
    <div class="__list">
      <div class="__match" v-for="match in matches">
        <nuxt-link :to="`/admin/matches/${match.id}`">
          {{ match.matchName }}
        </nuxt-link>
        <CommonInput
          type="number"
          v-model="matchResult.homeTeamScore"
          placeholder="Home team score"
        />
        <CommonInput
          type="number"
          v-model="matchResult.awayTeamScore"
          placeholder="Away team score"
        />
        <CommonButton @click="onSubmit(match.id)">Save Result</CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async mounted() {
    await this.fetchFootballMatches();
  },
  data() {
    return {
      matchResult: {
        homeTeamScore: null,
        awayTeamScore: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      matches: "admin/matches/getMatches",
    }),
  },
  methods: {
    ...mapActions({
      fetchFootballMatches: "admin/matches/fetchFootballMatches",
      submitResult: "admin/matches/submitResult",
    }),
    async onSubmit(matchId) {
      await this.submitResult({ matchId, result: this.matchResult });
    },
  },
};
</script>
<style>
.__match {
  margin-bottom: 20px;
}
</style>
