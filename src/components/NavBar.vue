<script setup lang="ts">
defineProps<{ msg?: string }>();
</script>

<template>
  <div>
    <a @click="$router.go(-1)">Back</a>
    <a @click="$router.go(1)">Front</a>
  </div>
  <div>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/auth">Go to Auth</RouterLink>
      <RouterLink to="/profile">Go to Profile</RouterLink>
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
