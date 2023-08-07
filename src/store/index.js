import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { carritoModule } from './modules/carrito';
import { usuarioModule } from './modules/usuario';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    carrito: carritoModule,
    usuario: usuarioModule,
  },
});
