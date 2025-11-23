<script setup>
import { ref } from 'vue'
const counter = ref(0)

const increment = () => {
  counter.value += 1
}
</script>

<template>
  <span>Counter: {{ counter }}</span>
  <button @click="increment">Click</button>
</template>

<style scoped>
button {
  margin-left: 10px;
}
</style>
