<template>
  <div class="__login flex justify-center items-center min-h-screen">
    <form
      class="__box bg-white rounded-lg p-4"
      @submit.prevent="submit"
      type="POST"
    >
      <CommonFormField inputId="email" label="Email">
        <CommonInput
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          required
          v-model="form.email"
        />
      </CommonFormField>

      <CommonFormField inputId="password" label="Password">
        <CommonInput
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
          v-model="form.password"
        />
      </CommonFormField>

      <CommonFormField inputId="confirm-password" label="Confirm password">
        <CommonInput
          type="password"
          id="confirm-password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
          v-model="form.password_confirmation"
        />
      </CommonFormField>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        name: "Test Example",
        email: "admin@test.com",
        password: "password",
        password_confirmation: "password",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith("laravelSanctum", { data: this.form });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss"></style>
