<template>
  <div class="productos-component container">
    <h1>Productos</h1>
    <router-link to="/productos/nuevo" class="btn btn-primary mb-3"
      >Nuevo Producto</router-link
    >
    <a @click="volverAlInicio" class="volver-link">Volver al Inicio</a>
    <table class="table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="libro in getLibros" :key="libro.id">
          <td>{{ libro.titulo }}</td>
          <td>${{ libro.precio }}</td>
          <td>
            <router-link
              :to="`/productos/editar/${libro.id}`"
              class="btn btn-sm btn-primary"
            >
              <i class="bi bi-pencil-fill"></i>
            </router-link>
            <router-link
              :to="`/productos/eliminar/${libro.id}`"
              class="btn btn-sm btn-danger"
            >
              <i class="bi bi-trash-fill"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ProductosComponent",
  data() {
    return {
      libros: [],
    };
  },
  created() {
    this.isLoading = true;
    this.getLibrosAction().then(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters("carrito", ["getLibros", "loading"]),
  },
  methods: {
    ...mapActions("carrito", ["getLibrosAction"]),
    ...mapMutations("carrito", ["eliminarLibroMutation"]),
    volverAlInicio() {
      // Redirige al inicio utilizando el router de Vue
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.productos-component {
  margin-top: 100px;
}

table {
  margin-top: 20px;
  text-align: center;
}

th {
  font-weight: bold;
}

.btn-primary,
.btn-danger {
  margin-right: 5px;
}

.volver-link {
  padding: 10px 20px;
}
</style>
