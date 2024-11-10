<script setup lang="ts">
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";

const user = ref<User | null>(null);
const loading = ref(true);

// Initialize the auth listener on component mount
onMounted(() => {
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
    loading.value = false;
  });
});

// Function to handle Google login
const loginWithGoogle = async () => {
  // Open Google Sign-In popup
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  createUserDocument(user);
};

// Function to Logout
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

// Function to create user document in Firestore
const createUserDocument = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  // If the user document does not exist, create it
  if (!docSnap.exists()) {
    // Extract the display name, email, and photoURL from Google
    const fullName = user.displayName || "";
    const [firstName, lastName] = fullName.split(" ");
    await setDoc(userRef, {
      firstName: firstName || "",
      lastName: lastName || "",
      email: user.email || "",
      avatar: user.photoURL || "",
      createdAt: new Date().toISOString(),
      role: "user", // Default role
    });
  }
};
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="user">{{ user.displayName }}</div>
      <div v-else>Not logged in</div>
      <button v-if="!user" @click="loginWithGoogle">Login with Google</button>
      <button v-else @click="logout">Logout</button>
    </div>
  </div>
</template>
