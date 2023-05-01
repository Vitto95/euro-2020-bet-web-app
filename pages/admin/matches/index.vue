<template>
  <div class="__admin-matches">
    <div class="__actions flex justify-between items-center">
      <div class="__box">
        <CommonButton @click="goCreateNewMatch">New match</CommonButton>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="__spinner-wrapper flex justify-center items-center h-screen"
    >
      <CommonSpinner />
    </div>

    <!-- to change -->
    <div v-else class="__content">
      <div class="__count">
        <strong>Past matches ({{ matches.length }})</strong>
      </div>
      <div v-for="match in matches" :key="match.id" class="my-4">
        <FootballMatchCard is-admin-section :match="match" />
      </div>
    </div>

    <!-- <div class="__list">
      <div class="__match" v-for="match in matches">
        <nuxt-link :to="`/admin/matches/${match.id}`">
          {{ match.matchName }}
        </nuxt-link>
        <CommonInput
          type="number"
          v-model.number="matchResult.homeTeamScore"
          placeholder="Home team score"
        />
        <CommonInput
          type="number"
          v-model.number="matchResult.awayTeamScore"
          placeholder="Away team score"
        />
        <CommonButton @click="onSubmit(match.id)">Save Result</CommonButton>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  head() {
    return {
      link: [
        // Add this
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchFootballMatches();
  },
  data() {
    return {
      isLoading: false,
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
    goCreateNewMatch() {
      this.isLoading = true;
      this.$router.push("/admin/matches/new");
      this.isLoading = false;
    },
    async onFetch() {
      await this.fetchFootballMatches();
    },
    async onSubmit(matchId) {
      await this.submitResult({ matchId, result: this.matchResult });
    },
  },
};
</script>
<style>
.__admin-matches {
}

.__match {
  margin-bottom: 20px;
}
</style>
