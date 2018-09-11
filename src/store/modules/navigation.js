const store = {
  namespaced: true,
  state: {
    drawer: false
  },
  mutations: {
    setDrawer (state, value) {
      state.drawer = value
    },
    toggleDrawer (state) {
      state.drawer = !state.drawer
    }
  },
  actions: {
    setDrawer({ commit }, value) {
      commit('setDrawer', value)
    },
    toggleDrawer({ commit }) {
      commit('toggleDrawer')
    },
  },
  getters: {
    drawer (state) {
      return state.drawer
    }
  }
}

export default store