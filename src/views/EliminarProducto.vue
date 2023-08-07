<template>
  <div class="eliminar-producto container">
    <h1>Eliminar Producto</h1>
    <div class="producto-info">
      <h3>Título: {{ producto.titulo }}</h3>
      <p>Autor: {{ producto.autor }}</p>
      <p>Precio: ${{ producto.precio }}</p>
      <p>Imagen: {{ producto.imagen }}</p>
    </div>
    <button class="btn btn-danger" @click="eliminarProducto">Eliminar</button>
  </div>
</template>

<script>
export default {
  name: "EliminarProducto",
  data() {
    return {
      producto: {},
    };
  },
  created() {
    const id = this.$route.params.id;
    this.producto = this.$store.getters["carrito/getLibroById"](id);
  },
  methods: {
    eliminarProducto() {
      const id = this.$route.params.id;
      this.$store
        .dispatch("carrito/eliminarProductoAction", id)
        .then(() => {
          this.$router.push("/productos");
        })
        .catch((error) => {
          console.log("Error al eliminar el producto:", error);
        });
    },
  },
};
</script>

<style scoped>
.eliminar-producto {
  margin-top: 100px;
}

.producto-info {
  margin-bottom: 20px;
}

.btn-danger {
  margin-right: 5px;
}
</style>
