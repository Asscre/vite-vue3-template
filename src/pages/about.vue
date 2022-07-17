<template>
  <div class="mt-20 mb-10 text-6xl">About Page</div>
  <p class="mb-5 caret-green-400 text-4xl">{{ store.state.count }}</p>
  <div class="mr-2 inline-flex rounded-md shadow">
    <button
      class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
      @click="toHome"
    >
      To Home Page
    </button>
  </div>
  <button
    class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
    @click="increment"
  >
    +
  </button>
</template>

<script setup>
import router from '../routes';
import store from '../store';

const toHome = () => {
  router.push('/');
};

const increment = () => {
  store.commit('increment');
  console.log(store.state.count);
};
</script>
