<template>
  <input
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :type="inputType"
    @input="onInput"
    :placeholder="placeholder"
    :required="required"
    :value="value"
    :disabled="disabled"
    :min="min"
  />
</template>
<script>
export default {
  name: "Input",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    inputType: {
      type: String,
      default: "text",
    },
    min: {
      type: Number,
      default: "null",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Date],
      default: null,
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
<style lang="scss"></style>
