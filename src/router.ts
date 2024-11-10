import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/auth", name: "auth", component: Auth },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
