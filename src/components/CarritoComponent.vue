<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title text-primary">Carrito de compra</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="getCarritoLength === 0">El carrito está vacío.</p>
          <div v-else>
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th class="title-col">Producto</th>
                  <th class="title-col">Precio</th>
                  <th class="title-col">Cantidad</th>
                  <th class="title-col">Total</th>
                  <th class="title-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(libro, index) in getCarrito"
                  :key="libro.id"
                  :class="index % 2 === 0 ? 'even-row' : 'odd-row'"
                >
                  <td>{{ libro.titulo }}</td>
                  <td>$ {{ libro.precio }}</td>
                  <td>
                    <div class="input-group">
                      <button
                        class="btn btn-outline-primary"
                        @click="decrementar(libro)"
                      >
                        <i class="bi bi-dash"></i>
                      </button>
                      <button class="btn btn-outline-primary">
                        {{ libro.cantidad }}
                      </button>
                      <button
                        class="btn btn-outline-primary"
                        @click="incrementar(libro)"
                      >
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td>$ {{ libroTotal(libro) }}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="eliminarLibro(libro)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end">Total:</td>
                  <td colspan="2">$ {{ getLibroTotal }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center">
              <button
                class="btn btn-primary confirm-btn"
                @click="mostrarConfirmacionPago"
              >
                PAGAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2"; // Importa SweetAlert

export default {
  name: "CarritoComponent",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("carrito", [
      "getCarrito",
      "getCarritoLength",
      "getLibroTotal",
    ]),
  },
  methods: {
    incrementar(libro) {
      this.$store.dispatch("carrito/incrementAction", libro);
    },
    decrementar(libro) {
      this.$store.dispatch("carrito/decrementAction", libro);
    },
    libroTotal(libro) {
      return libro.precio * libro.cantidad;
    },
    eliminarLibro(libro) {
      this.$store.dispatch("carrito/eliminarAction", libro);
    },
    ...mapActions("carrito", [
      "incrementAction",
      "decrementAction",
      "eliminarAction",
    ]),

    mostrarConfirmacionPago() {
      // Muestra SweetAlert con el mensaje de confirmación de compra
      Swal.fire({
        icon: "question",
        title: "Confirmar compra",
        text: "¿Estás seguro de que deseas realizar la compra?",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // SweetAlert para la compra realizada
          Swal.fire({
            icon: "success",
            title: "Compra realizada",
            text: "¡Tu compra ha sido realizada con éxito!",
          });

          // Vaciar el carrito
          this.$store.dispatch("carrito/vaciarCarritoAction");
        } else {
          // SweetAlert para la compra cancelada
          Swal.fire({
            icon: "info",
            title: "Compra cancelada",
            text: "Tus productos siguen en el carrito.",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 0;
}

.modal-header {
  justify-content: center;
}

.modal-body {
  padding: 0;
}

.table {
  margin-bottom: 0;
}

.table th,
.table td {
  vertical-align: middle;
}

.table-striped tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #fff;
}

.title-col {
  background-color: var(--bs-primary);
  color: #fff;
}

.input-group {
  width: 100%;
}

.input-group .btn {
  width: 3rem;
  margin: 0 0.5rem;
}

.confirm-btn {
  margin-top: 1rem;
  background-color: var(--bs-primary);
  color: #fff;
}
</style>
