<template>
  <div class="__new-match">
    <div>Create new match</div>
    <nuxt-link to="/admin/matches">Back</nuxt-link>
    <form
      class="__box bg-white rounded-lg p-4"
      @submit.prevent="submit"
      type="POST"
    >
      <CommonFormField inputId="home-team" label="Home Team">
        <CommonInput
          type="text"
          id="home-team"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Home Team"
          required
          v-model="form.homeTeamName"
        />
      </CommonFormField>

      <CommonFormField inputId="away-team" label="Away Team">
        <CommonInput
          type="text"
          id="away-team"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Away Team"
          required
          v-model="form.awayTeamName"
        />
      </CommonFormField>

      <CommonFormField inputId="starts-at" label="Start Date">
        <CommonInput
          type="date"
          id="starts-at"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Start date"
          required
          v-model="form.startsDate"
        />
      </CommonFormField>

      <CommonFormField inputId="starts-time" label="Start time">
        <CommonInput
          type="time"
          id="starts-time"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Start time"
          required
          v-model="form.startsTime"
        />
      </CommonFormField>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Match
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        homeTeamName: "",
        awayTeamName: "",
        startsDate: "",
        startsTime: "",
      },
    };
  },
  async mounted() {
    await this.fetchFootballMatch(this.$route.params.id);
    this.form.homeTeamName = this.match.homeTeamName;
    this.form.awayTeamName = this.match.awayTeamName;
    this.form.startsDate = this.match.startsDate;
    this.form.startsTime = this.match.startsTime;
  },

  computed: {
    ...mapGetters({
      match: "admin/matches/getMatch",
    }),
  },

  methods: {
    ...mapActions({
      fetchFootballMatch: "admin/matches/fetchFootballMatch",
    }),
    async submit() {
      try {
        await this.$axios.get("/sanctum/csrf-cookie");
        await this.$axios.put(
          `api/admin/v1/matches/${this.$route.params.id}`,
          this.form
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang=""></style>
