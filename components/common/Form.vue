<template>
  <form :action="action" @submit.prevent="submit">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "Form",
  props: {
    action: {
      type: String,
      default: "post",
    },
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<style lang=""></style>
