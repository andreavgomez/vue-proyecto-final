export const carritoModule = {
  namespaced: true,
  state: {
    carrito: [],
    libros: [],
    loading: false,
  },
  mutations: {
    incrementQ: (state, libro) => {
      let aux = [...state.carrito];

      aux.forEach((l) => {
        if (l.id === libro.id) {
          l.cantidad = l.cantidad + 1;
        }
      });

      state.carrito = aux;
    },
    decrementQ: (state, libro) => {
      let aux = [...state.carrito];

      aux.forEach((l) => {
        if (l.id === libro.id && l.cantidad > 0) {
          l.cantidad--;
        }
      });

      state.carrito = aux;
    },
    eliminar: (state, libro) => {
      state.carrito = state.carrito.filter((l) => l.id !== libro.id);
    },
    agregarACarrito: (state, libro) => {
      state.carrito.push(libro);
    },
    getLibrosMutation: (state, libros) => {
      state.libros = libros;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    guardarCambiosLibroMutation: (state, producto) => {
      // Actualizo el estado, busco el libro en state.libros por su id y lo actualizo
      const index = state.libros.findIndex((item) => item.id === producto.id);
      if (index !== -1) {
        state.libros.splice(index, 1, producto);
      }
    },
    eliminarLibroMutation: (state, id) => {
      state.libros = state.libros.filter((libro) => libro.id !== id);
    },
    agregarLibroMutation: (state, libro) => {
      state.libros.push(libro);
    },
    vaciarCarritoMutation: (state) => {
      state.carrito = [];
    },
  },
  actions: {
    incrementAction: (context, libro) => {
      context.commit('incrementQ', libro);
    },
    decrementAction: (context, libro) => {
      context.commit('decrementQ', libro);
    },
    eliminarAction: (context, libro) => {
      context.commit('eliminar', libro);
    },
    agregarACarritoAction: (context, libro) => {
      context.commit('agregarACarrito', libro);
    },
    getLibrosAction: (context) => {
      context.commit('setLoading', true);
      fetch("https://649e5806245f077f3e9c4bc1.mockapi.io/libros")
        .then((res) => res.json())
        .then((libros) => {
          context.commit('getLibrosMutation', libros);
          context.commit('setLoading', false);
        })
        .catch((error) => {
          console.error("Error fetching libros:", error);
          context.commit('setLoading', false);
        });
    },
    guardarCambiosLibroAction: (context, producto) => {
      fetch(`https://649e5806245f077f3e9c4bc1.mockapi.io/libros/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Cambios guardados:", data);
          context.commit("guardarCambiosLibroMutation", data);
        })
        .catch((error) => {
          console.log("Error al guardar los cambios:", error);
        });
    },
    eliminarProductoAction: (context, id) => {
      fetch(`https://649e5806245f077f3e9c4bc1.mockapi.io/libros/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          console.log("Producto eliminado");
          context.commit('eliminarLibroMutation', id);
        })
        .catch((error) => {
          console.log("Error al eliminar el producto:", error);
        });
    },
    agregarLibroAction: (context, producto) => {
      return new Promise((resolve, reject) => {
        fetch("https://649e5806245f077f3e9c4bc1.mockapi.io/libros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Nuevo producto guardado:", data);
            context.commit("agregarLibroMutation", data);
            resolve(data);
          })
          .catch((error) => {
            console.log("Error al guardar el nuevo producto:", error);
            reject(error);
          });
      });
    },
    vaciarCarritoAction: (context) => {
      context.commit('vaciarCarritoMutation');
    },
  },
  getters: {
    getCarrito: (state) => {
      return state.carrito;
    },
    getLibroTotal: (state) => {
      let total = 0;
      state.carrito.forEach((l) => {
        total = total + l.precio * l.cantidad;
      });
      return total;
    },
    getCarritoLength: (state) => {
      return state.carrito.length
    },
    getLibroCarritoById: (state) => (id) => {
      return state.carrito.find((item) => item.id === id);
    },
    getLibros: (state) => {
      return state.libros;
    },
    getLibroById: (state) => (id) => {
      return state.libros.find((item) => item.id === id);
    },
  }
};
