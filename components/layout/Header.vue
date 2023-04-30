<template>
  <div class="__header">
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
<style lang=""></style>
