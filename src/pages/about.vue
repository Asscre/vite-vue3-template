<template>
  <div>about page</div>
  <p>{{ store.state.count }}</p>
  <button @click="toHome">toHome</button>
</template>

<script setup>
import router from '../routes';
import store from '../store';

const toHome = () => {
  router.push('/');
};
</script>
