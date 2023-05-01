<template>
  <div class="__header">
    <div class="__auth" v-if="$auth.loggedIn">
      <div class="__box">
        <nuxt-link to="/">Home</nuxt-link>
      </div>

      <div class="__box">
        <nuxt-link to="/ranking">Ranking</nuxt-link>
      </div>
      <div class="__box">
        <nuxt-link to="/admin/matches" v-if="isAdmin">Admin</nuxt-link>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <div v-else class="__public flex justify-end">
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isAdmin() {
      return this.$auth?.user?.role_id && this.$auth?.user?.role_id === 1;
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
<style lang="scss">
.__header {
  padding: 1rem 1.5rem;
  .__auth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .__box {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
