<template>
  <div class="home-component">
    <!-- Mostrar el spinner de carga cuando 'isLoading' sea verdadero -->
    <div v-if="isLoading" class="text-center">
      <!-- console.log(`v-if cargando libros...`); -->
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p>Cargando libros...</p>
      <!-- console.log(`cargando libros...`); -->
    </div>

    <!-- Mostrar los libros cuando 'isLoading' sea falso -->
    <div v-else class="row">
      <!-- console.log(`v-else cargando libros...`); -->
      <div class="col" v-for="libro in getLibros" :key="libro.id">
        <div :id="libro.id" class="card">
          <img
            class="card-img-top img-fluid"
            :src="require(`@/assets/${libro.imagen}`)"
            :alt="libro.titulo"
            style="height: 200px"
          />
          <div class="card-body">
            <h4 class="card-title">{{ libro.titulo }}</h4>
            <p>Autor: {{ libro.autor }}</p>
            <p>Precio: ${{ libro.precio }}</p>
            <button class="btn btn-primary" @click="agregarAlCarrito(libro)">
              <i class="bi bi-cart bi-size"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "HomePage",
  data() {
    return {
      isLoading: false,
      showModal: false,
    };
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("carrito/getLibrosAction").then(() => {
      this.isLoading = false; // Establecer isLoading a false cuando la promesa se resuelva
    });
  },
  computed: {
    ...mapGetters("carrito", ["getLibros", "loading"]),
  },
  methods: {
    openModal() {
      this.showModal = true;
      console.log(this.showModal);
    },
    closeModal() {
      this.showModal = false;
      console.log(this.showModal);
    },
    findById(id) {
      return this.$store.getters["carrito/getLibroCarritoById"](id);
    },
    agregarAlCarrito(libro) {
      libro.cantidad = 1;

      const enCarrito = this.findById(libro.id);

      if (!enCarrito) {
        this.$store.dispatch("carrito/agregarACarritoAction", libro);
        // Agregar el SweetAlert cuando se agrega un libro al carrito        
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          text: `El libro "${libro.titulo}" ha sido agregado al carrito.`,
          confirmButtonText: "OK",
          confirmButtonColor: "#007bff",
        });
      } else {
        console.log(`El libro ya existe en el carrito`);
        Swal.fire({
          icon: "info",
          title: "El Producto ya existe en el carrito",
          text: `El libro "${libro.titulo}" ya se encuentra en el carrito.`,
          confirmButtonText: "OK",
          confirmButtonColor: "#007bff",
        });
      }
    },
  },
};
</script>

<style scoped>
.home-component {
  margin: 120px auto;
  max-width: 1200px;
  padding: 20px;
}

.card {
  width: 18rem;
  margin-bottom: 30px;
}

.card-img-top {
  height: 200px;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-title {
  margin-top: 10px;
  margin-bottom: 0;
}

.card-body p {
  margin-bottom: 5px;
}

.btn-primary {
  margin-top: 10px;
}

.custom-background {
  background-color: #6a6a6a;
}

.spinner-border {
  margin-top: 50px;
}
</style>
