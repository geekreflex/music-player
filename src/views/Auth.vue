<script setup lang="ts">
import { useAuth } from "../composables/useAuth";

const { loading, loginWithGoogle, logout, isAuthenticated } = useAuth();
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="!isAuthenticated">Not logged in</div>
      <button v-if="!isAuthenticated" @click="loginWithGoogle">
        Login with Google
      </button>
      <button v-else @click="logout">Logout</button>
    </div>
  </div>
</template>
