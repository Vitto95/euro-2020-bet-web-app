<template>
  <button
    :disabled="disabled"
    :class="[type, { disabled: disabled }]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "primary",
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss">
.primary {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow;
}

.disabled {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 opacity-50 rounded-lg cursor-not-allowed;
}
</style>
