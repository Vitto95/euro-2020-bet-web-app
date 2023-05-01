<template>
  <div class="__ranking">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Rank</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(rank, index) in ranking"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">{{ rank.name }}</td>
            <td class="px-6 py-4">{{ rank.winning_bets }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ranking: [],
    };
  },
  async mounted() {
    await this.fetchRanking();
  },
  methods: {
    async fetchRanking() {
      try {
        let response = await this.$axios.get("api/v1/ranking");
        this.ranking = response.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang=""></style>
