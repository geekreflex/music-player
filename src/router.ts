// Import necessary modules
import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import { useAuth } from "./composables/useAuth";
import { watch } from "vue";

// Define routes
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/auth", name: "auth", component: Auth },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

// Initialize router
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, _from, next) => {
  const { isAuthenticated, loading } = useAuth();

  // Allow navigation if the app is still loading authentication state
  if (loading.value) {
    next(); // Proceed to the route without blocking
    return;
  }

  // Wait until the auth state is determined
  // if (loading.value) {
  //   await new Promise<void>((resolve) => {
  //     const unwatch = watch(
  //       () => loading.value,
  //       (val) => {
  //         if (!val) {
  //           unwatch(); // Stop watching after loading is complete
  //           resolve();
  //         }
  //       }
  //     );
  //   });
  // }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "auth" }); // Redirect to auth if not authenticated
  } else {
    next(); // Proceed to the route
  }
});
