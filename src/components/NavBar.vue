<script setup lang="ts">
defineProps<{ msg?: string }>();
const name: string = "Jerry";
</script>

<template>
  <p class="title">This is Nav by {{ name }} {{ msg }}</p>
  <div>
    <a @click="$router.go(-1)">Back</a>
    <a @click="$router.go(1)">Front</a>
  </div>
  <div>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/auth">Go to Auth</RouterLink>
    </nav>
  </div>
</template>

<style>
.title {
  font-size: 40px;
}

nav {
  display: flex;
  flex-direction: column;
}
</style>
