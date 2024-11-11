<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAuth } from "../composables/useAuth";
import { UserData } from "../interfaces/user";
import { getUserProfile } from "../services/userService";

const { user, loading, logout } = useAuth();
const profile = ref<UserData | null>(null);
const isLoading = ref(true);

// Fetch user profile on component mount
onMounted(async () => {
  if (user.value) {
    profile.value = await getUserProfile(user.value);
    isLoading.value = false;
  }
});

// Watch for changes in user and fetch the profile when the user changes
watch(user, async (newUser) => {
  if (newUser) {
    profile.value = await getUserProfile(newUser);
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <p v-if="loading || isLoading">Loading...</p>
    <div v-else>
      <p>This is profile view</p>
      <div v-if="profile">
        <img :src="profile.avatar" style="border-radius: 100%" />
        <p>{{ profile.firstName }} {{ profile.lastName }}</p>
        <div>{{ profile.email }}</div>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
