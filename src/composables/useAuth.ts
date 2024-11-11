import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { computed, ref } from "vue";
import { auth, googleProvider } from "../config/firebase";
import { createUserDocument } from "../services/userService";
import { router } from "../router";

const user = ref<User | null>(null);
const loading = ref(true);

// Function to handle Google login
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const authUser = result.user;
    user.value = authUser;

    // After login, create or fetch user document from Firestore
    await createUserDocument(authUser); // Create user document if not exists

    // Redirect user to the Home page ('/')
    router.push({ name: "home" }); // Use router.push to navigate to home
  } catch (error) {
    console.error("Google login error:", error);
  }
};

// This function only runs once to set up the auth state listener
onAuthStateChanged(auth, async (authUser) => {
  if (authUser) {
    user.value = authUser;
  } else {
    user.value = null;
  }
  loading.value = false;
});

// Computed property to check if user is authenticated
const isAuthenticated = computed(() => !!user.value);

// Function to log out the user
const logout = async () => {
  try {
    await signOut(auth);
    user.value = null; // Clear user data upon logout
    router.push({ name: "home" }); // Use router.push to navigate to home
  } catch (error) {
    console.error(error);
  }
};

export function useAuth() {
  return { user, isAuthenticated, loginWithGoogle, logout, loading };
}
