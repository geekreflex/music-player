<script setup lang="ts">
import { count, decrement, increment } from "../core";
</script>

<template>
  <div>
    <p>This is home view</p>
    <button @click="increment" style="width: 100px">+</button>
    <span>{{ count }}</span>
    <button @click="decrement" style="width: 100px">-</button>
  </div>
</template>
