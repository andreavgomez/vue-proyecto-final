import Swal from 'sweetalert2';

export const usuarioModule = {
  namespaced: true,
  state: {
    currentUser: null,
    usuarios: []
  },
  mutations: {
    setCurrentUser(state, user) {
      if (user !== null && user.usr === 'admin') {
        state.currentUser = user;
        state.currentUser.isAdmin = true;
      } else if (user !== null && user.usr !== 'admin') {
        state.currentUser = user;
        state.currentUser.isAdmin = false;
      } else {
        state.currentUser = user;
      }
    },
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
  },
  actions: {
    setCurrentUserAction: (context, user) => {
      context.commit('setCurrentUser', user);
    },
    async obtenerUsuarios({ commit }) {
      try {
        // Realiza la llamada a la API para obtener los usuarios
        const response = await fetch("https://649e5806245f077f3e9c4bc1.mockapi.io/usuarios");
        const usuarios = await response.json();

        // Llama a la mutación para almacenar los usuarios en el estado y setear el actual
        commit("setUsuarios", usuarios);
        commit("setCurrentUser", usuarios);
      } catch (error) {
        // Maneja el error en caso de fallar la llamada a la API
        console.error("Error al obtener usuarios:", error);
      }
    },
    async crearUsuarioAction(context, newUsuario) {

      function usuarioExistente(usuarios, nombreUsuario) {
        return usuarios.some((usuario) => usuario.usr === nombreUsuario);
      }

      try {
        // Obtener la lista de usuarios de la API
        const response = await fetch("https://649e5806245f077f3e9c4bc1.mockapi.io/usuarios");
        const usuarios = await response.json();

        // Verificar si el usuario ya está registrado utilizando la función 
        if (usuarioExistente(usuarios, newUsuario.usr)) {
          // Mostrar SweetAlert si el usuario ya está registrado
          Swal.fire({
            icon: 'warning',
            title: 'Usuario existente',
            text: 'El usuario ya se encuentra registrado.',
          });

          // Rechazar la promesa para indicar que el usuario no se ha creado
          return Promise.reject();
        }

        // Si el usuario no está registrado, proceder con el registro
        const data = await fetch("https://649e5806245f077f3e9c4bc1.mockapi.io/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUsuario),
        });
        const userData = await data.json();

        // Mostrar SweetAlert para el caso de éxito
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado con éxito',
          text: 'El usuario se ha registrado correctamente.',
        });

        // Actualizar el estado con el nuevo usuario
        context.commit("setUsuarios", [...usuarios, userData]);
        context.commit("setCurrentUser", userData);

        return Promise.resolve(userData);
      } catch (error) {
        // Mostrar SweetAlert para el caso de error
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el usuario',
          text: 'No se pudo registrar el usuario. Por favor, inténtelo de nuevo más tarde.',
        });

        return Promise.reject(error);
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
};