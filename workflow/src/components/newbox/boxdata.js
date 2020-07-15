import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boxname: [],
    ccpeoplename: [],
    boxtype: { type:111 },
    optionaltype: false,
  },
  getters: {

  },
  mutations: {
    setPosition(state, position) {
      state.position = position;
    },
    setState(state, newState) {
      state.stack = state.stack.slice(0, state.position + 1);
      state.stack.push(newState);
    },

  },
  actions: {
    pushState({ state, getters, commit }, newState) {
      if (newState === getters.currentState || state.disabled) {
        return;
      }

      commit('setState', newState);
      commit('setPosition', state.stack.length - 1);
    },
  },
});
