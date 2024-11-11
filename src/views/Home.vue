<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import { count, decrement, increment } from "../core";
const { isAuthenticated, loading } = useAuth();
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="!loading">This is home view</p>
    <p>Authenticated: {{ isAuthenticated ? "True" : "False" }}</p>
    <button @click="increment" style="width: 100px">+</button>
    <span>{{ count }}</span>
    <button @click="decrement" style="width: 100px">-</button>
  </div>
</template>
