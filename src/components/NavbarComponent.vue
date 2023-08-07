<template>
  <div class="vue-template">
    <nav
      class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
    >
      <div class="container">
        <a class="navbar-brand float-left" href="/">
          Libreria El arte de Leer
        </a>
        <ul class="nav navbar-nav flex-row float-right inline-block">
          <li class="nav-item" v-if="!getCurrentUser">
            <router-link class="btn btn-outline-primary" to="/login">
              <i class="bi bi-person-circle bi-size"></i>
            </router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/productos"
              >Productos</router-link
            >
          </li>
          <li class="nav-item" v-if="getCurrentUser">
            <router-link
              class="btn btn-outline-danger"
              to="/"
              v-on:click.native="logout()"
            >
              Salir
            </router-link>
          </li>
          <li class="nav-item" v-if="!getCurrentUser">
            <router-link class="btn btn-outline-primary" to="/registration">
              Registrarse
            </router-link>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i class="bi bi-cart bi-size"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template> 

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarComponent",
  props: ["carrito"],
  computed: {
    ...mapGetters("usuario", ["getCurrentUser"]),
    isAdmin() {
      return this.getCurrentUser && this.getCurrentUser.isAdmin;
    },
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("usuario/setCurrentUserAction", null);
      if (this.$route.path !== "/") {
        this.$router.replace({ name: "home" });
      }
    },
  },
};
</script>

<style>
.bi-size {
  font-size: 30px;
  width: 2rem;
}

.nav-item {
  padding: 4px;
}
</style>