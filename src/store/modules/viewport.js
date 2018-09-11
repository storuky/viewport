const store = {
  namespaced: true,
  state: {
    scale: 1,
    translate: {x: 0, y: 0}
  },
  mutations: {
    setScale (state, scale) {
      state.scale = scale
    },
    setTranslate (state, translate) {
      state.translate = translate
    },
  },
  actions: {
    setScale ({ commit }, scale) {
      commit('setScale', scale)
    },
    setTranslate({ commit }, translate) {
      commit('setTranslate', translate)
    },
  },
  getters: {
    scale (state) {
      return state.scale
    },
    translate (state) {
      return state.translate
    }
  }
}

export default store