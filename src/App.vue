<template>
  <router-view />
</template>

<script setup>
import store from "@/store";
store.state.user = localStorage.getItem('user') || null;

</script>