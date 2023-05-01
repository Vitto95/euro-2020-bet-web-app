<template>
  <div class="__new-match">
    <CommonButton @click="goBack">Go back</CommonButton>
    <FootballMatchForm />
  </div>
</template>
<script>
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

  methods: {
    goBack() {
      this.$router.push("/admin/matches");
    },
    async submit() {
      try {
        await this.$axios.get("/sanctum/csrf-cookie");
        await this.$axios.post("api/admin/v1/matches", this.form);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang=""></style>
