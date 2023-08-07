import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "./views/HomePage.vue";
import ProductosComponent from "./views/ProductosComponent.vue";
import NuevoProducto from "./views/NuevoProducto.vue";
import EditarProducto from "./views/EditarProducto.vue";
import EliminarProducto from "./views/EliminarProducto.vue";
import LoginComponent from "./components/Login.vue";
import RegistrationComponent from "./components/Registration.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage, name: "home" },
  { path: "/productos", component: ProductosComponent, name: "productos" },
  { path: "/productos/nuevo", component: NuevoProducto, name: "nuevo-producto" },
  { path: "/productos/editar/:id", component: EditarProducto, name: "editar-producto" },
  { path: "/productos/eliminar/:id", component: EliminarProducto, name: "eliminar-producto" },
  { path: "/login", component: LoginComponent, name: "LoginComponent" },
  { path: "/Registration", component: RegistrationComponent, name: "RegistrationComponent" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;
