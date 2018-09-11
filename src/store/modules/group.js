const store = {
  namespaced: true,
  state: {
    list: [{id: 1, objectIds: [1,2]}]
  },
  mutations: {
    setList(state, groups) {
      state.list = groups
    },
  },
  actions: {
    setList({ commit }, groups) {
      commit('setList', groups)
    },
  },
  getters: {
    list (state) {
      return state.list
    }
  }
}

export default store