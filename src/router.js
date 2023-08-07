import Vue from "vue";
import VueRouter from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HelloWorld, name: "home" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;