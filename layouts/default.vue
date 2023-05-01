<template>
  <div class="__default-page p-4 bg-slate-100 min-h-screen">
    <LayoutHeader v-if="$auth.loggedIn" />
    <Nuxt />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
