<template>
  <div class="__index __bettable-matches">
    <div class="__menu">
      <CommonButton
        :disabled="activeSection === 'bettable'"
        @click="onClickMenu('bettable')"
      >
        Active
      </CommonButton>
      <CommonButton
        :disabled="activeSection === 'past'"
        @click="onClickMenu('past')"
      >
        Finished
      </CommonButton>
    </div>
    <div
      v-if="isLoading"
      class="__spinner-wrapper flex justify-center items-center h-screen"
    >
      <CommonSpinner />
    </div>

    <div v-else class="__content">
      <div class="__count">
        <strong>{{ matchCountLabel }} ({{ matches.length }})</strong>
      </div>
      <div v-for="match in matches" :key="match.id" class="my-4">
        <FootballMatchCard :match="match" />
      </div>
    </div>
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
  name: "IndexPage",
  data() {
    return {
      activeSection: "bettable",
      isLoading: false,
    };
  },
  async mounted() {
    await this.onFetch("bettable");
    await this.$axios.get("api/v1/ranking");
  },
  computed: {
    ...mapGetters({
      matches: "public/bets/getMatches",
    }),
    isBettableSection() {
      return this.activeSection === "bettable";
    },
    matchCountLabel() {
      return this.isBettableSection ? "Bettable Matches" : "Past matches";
    },
  },
  methods: {
    ...mapActions({
      fetchFootballMatches: "public/bets/fetchFootballMatches",
    }),
    async onFetch(option = "bettable") {
      this.isLoading = true;
      await this.fetchFootballMatches(option);
      this.isLoading = false;
    },
    isActiveButton(option) {
      this.activeSection === option;
    },
    async onClickMenu(option) {
      if (this.isActiveButton(option)) return;
      this.activeSection = option;
      await this.onFetch(option);
    },
  },
};
</script>

<style lang="scss">
.__index.__bettable-matches {
  .__menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .__count {
  }
}
</style>
