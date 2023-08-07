<template>
  <div id="app">
    <NavbarComponent />
    <CarritoComponent />
    <router-view />
  </div>
</template>

<script>
import CarritoComponent from "./components/CarritoComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    CarritoComponent,
    NavbarComponent,
  },
};
</script>
