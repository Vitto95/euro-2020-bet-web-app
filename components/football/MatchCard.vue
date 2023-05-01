<template>
  <div class="__match">
    <div class="__outer-content border-b border-solid border-slate-100">
      <div class="__box">
        <nuxt-link v-if="isAdminUser" :to="`/admin/matches/${match.id}`">
          <strong>{{ match.matchName }}</strong>
        </nuxt-link>
        <strong v-else>
          {{ match.matchName }}
        </strong>
        <div>
          Start: <strong>{{ formattedLocalizedStartsAt }}</strong>
        </div>
      </div>
      <div class="__box">
        <div class="__actions">
          <div v-if="canBet" class="__inputs __bet">
            <CommonInput
              type="number"
              v-model.number="bet.homeTeamBetScore"
              placeholder="Home team bet score"
              :min="0"
            />
            <CommonInput
              type="number"
              v-model.number="bet.awayTeamBetScore"
              placeholder="Away team bet score"
              :min="0"
            />
            <CommonButton :disabled="cannoteSaveBet" @click="onBet">
              Bet
            </CommonButton>
          </div>
          <div v-else-if="hasMatchResult">
            Match result:
            <strong>{{ formattedMatchScore(match) }}</strong>
          </div>
          <div v-else-if="hasAlreadyBet && !isAdminSection">
            Your bet result:
            <strong v-if="userBet">{{ formattedBetScore(userBet) }}</strong>
          </div>

          <div
            class="__inputs __result"
            v-if="isAdminSection && isAdminUser && !hasMatchResult"
          >
            <CommonInput
              :min="0"
              type="number"
              v-model.number="matchResult.homeTeamScore"
              placeholder="Home team score"
            />
            <CommonInput
              :min="0"
              type="number"
              v-model.number="matchResult.awayTeamScore"
              placeholder="Away team score"
            />
            <CommonButton @click="onSubmit(match.id)">Save</CommonButton>
          </div>

          <div
            v-if="!isBettingOpen"
            class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p class="font-bold">Betting session closed!</p>
          </div>

          <span
            v-if="!isBettingOpen"
            @click="isOpen = !isOpen"
            class="material-icons cursor-pointer"
          >
            {{ iconLabel }}
          </span>
        </div>
      </div>
    </div>
    <div class="__inner-content" v-if="hasBets && !isBettingOpen && isOpen">
      <div class="flex items-center border-b border-solid border-slate-100 p-4">
        All users bets <strong>({{ match.bets.length }})</strong>
      </div>
      <div class="p-4" v-for="bet in match.bets" :key="bet.id">
        <strong>User: {{ bet.attributes.userName }}</strong>
        <div>
          Result bet:
          <strong>{{ formattedBetScore(bet) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: {
    isAdminSection: {
      type: Boolean,
      default: false,
    },
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bet: {
        homeTeamBetScore: "",
        awayTeamBetScore: "",
      },
      matchResult: {
        homeTeamScore: null,
        awayTeamScore: null,
      },
      isOpen: false,
    };
  },
  computed: {
    isAdminScene() {
      return this.isAdminSection && this.isAdminUser;
    },
    isAdminUser() {
      return this.$auth.user.role_id === 1;
    },
    localizedStartsAt() {
      return moment.utc(this.match.startsAt).local();
    },
    formattedLocalizedStartsAt() {
      return this.localizedStartsAt.format("DD/MM/YYYY - HH:mm");
    },
    canBet() {
      return this.isBettingOpen && !this.hasAlreadyBet && !this.isAdminSection;
    },
    cannoteSaveBet() {
      return Object.keys(this.bet).some(
        (attribute) => this.bet[attribute] === ""
      );
    },
    hasAlreadyBet() {
      return this.match.userBet;
    },
    hasBets() {
      return this.match.bets.length > 0;
    },
    hasMatchResult() {
      return (
        this.match.homeTeamScore !== null && this.match.awayTeamScore !== null
      );
    },
    isBettingOpen() {
      return moment(this.localizedStartsAt).isAfter(
        moment().add(30, "minutes")
      );
    },
    iconLabel() {
      return this.isOpen ? "expand_less" : "expand_more";
    },
    userBet() {
      return this.match.userBet ?? null;
    },
  },
  methods: {
    ...mapActions({
      fetchAdminFootballMatches: "admin/matches/fetchFootballMatches",
      fetchFootballMatches: "public/bets/fetchFootballMatches",
      submitResult: "admin/matches/submitResult",
    }),
    formattedMatchScore(match) {
      return `${match.homeTeamScore} - ${match.awayTeamScore}`;
    },
    formattedBetScore(bet) {
      return `${bet.attributes.homeTeamBetScore} - ${bet.attributes.awayTeamBetScore}`;
    },
    async onBet() {
      try {
        await this.$axios.post(
          `/api/v1/matches/${this.match.id}/users/${this.$auth.user.id}/bet`,
          this.bet
        );
        await this.fetchFootballMatches("bettable");
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit(matchId) {
      try {
        await this.submitResult({ matchId, result: this.matchResult });
        await this.fetchAdminFootballMatches();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss">
.__match {
  background-color: white;
  border-radius: 0.5rem;
  .__outer-content {
    padding: 1rem;
  }

  .__outer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .__inputs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>
