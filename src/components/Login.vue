<template>
  <div class="login-component">
    <form>
      <h3>Ingresar</h3>

      <div class="form-group">
        <label>Usuario</label>
        <input
          type="text"
          v-model="input.usr"
          class="form-control form-control-lg"
          placeholder="admin" 
        />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          v-model="input.pass"
          class="form-control form-control-lg"
          placeholder="123"
        />
      </div>

      <button
        type="button"
        @click="login"
        class="btn btn-dark btn-lg btn-block"
      >
        Ingresar
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">¿Olvidó su contraseña?</router-link>
      </p>

      <div class="social-icons">
        <ul>
          <li>
            <a href="#"><i class="bi bi-facebook"></i></a>
          </li>
          <li>
            <a href="#"><i class="bi bi-clipboard"></i></a>
          </li>
          <li>
            <a href="#"><i class="bi bi-watch"></i></a>
          </li>
        </ul>
      </div>

      <p v-if="error" class="error-message">
        <strong>{{ error }}</strong>
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginComponent",
  data() {
    return {
      input: {
        usr: "",
        pass: "",
      },
      error: "",
    };
  },
  computed: {
    ...mapGetters("usuario", ["getCurrentUser"]),
  },
  methods: {
    ...mapActions("usuario", ["obtenerUsuarios", "setCurrentUserAction"]),
    async login() {
      try {
        if (this.input.usr !== "" && this.input.pass !== "") {
          // Llamo a la acción obtenerUsuarios para cargar los datos de los usuarios desde la API
          await this.obtenerUsuarios();

          // Realizo la lógica para verificar el inicio de sesión, comparando las credenciales ingresadas con los usuarios almacenados en el estado de Vuex
          const usuarioValido = this.$store.state.usuario.usuarios.find(
            (usuario) =>
              usuario.usr === this.input.usr && usuario.pass === this.input.pass
          );

          if (usuarioValido) {
            // Inicio de sesión exitoso
            console.log("Inicio de sesión exitoso");

            // Agrego la propiedad isAdmin al usuario encontrado
            usuarioValido.isAdmin = usuarioValido.isAdmin || false;

            // Llamo a la acción setCurrentUserAction para establecer el usuario conectado en el estado
            this.setCurrentUserAction(usuarioValido);

            this.$router.replace({ name: "home" });
          } else {
            // Credenciales inválidas
            console.log("Credenciales inválidas");
            this.error = "Usuario o contraseña incorrectos";
          }
        } else {
          console.log(
            "Se deben proporcionar un nombre de usuario y contraseña"
          );
          this.error =
            "Debes proporcionar un nombre de usuario y una contraseña";
        }
      } catch (error) {
        // Maneja el error en caso de fallar el inicio de sesión
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-component {
  max-width: 400px;
  margin: 100px auto 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.social-icons ul {
  list-style: none;
  padding: 0;
  display: flex;
}

.social-icons li {
  margin-right: 10px;
}

.social-icons a {
  color: #000;
  font-size: 24px;
}

.error-message {
  color: red;
  font-size: 18px;
  margin-top: 10px;
}
</style>
