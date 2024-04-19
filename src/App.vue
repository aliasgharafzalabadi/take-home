<template>
  <router-view />
</template>

<script setup>
import store from "@/store";
store.dispatch("User" , JSON.parse(localStorage.getItem('user')) || null)

</script>