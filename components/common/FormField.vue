<template>
  <div class="__form-field mb-6">
    <label
      :for="inputId"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FormField",
  props: {
    inputId: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang=""></style>
