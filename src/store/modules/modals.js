const store = {
  namespaced: true,
  state: {
    propertyEditor: {
      opened: false
    }
  },
  mutations: {
    set (state, { type, value }) {
      state[type].opened = value
    },
    toggle(state, { type }) {
      state[type].opened = !state.opened
    },
    open (state, { type }) {
      state[type].opened = true
    },
    close (state, { type }) {
      state[type].opened = false
    }
  },
  actions: {
    set ({ commit }, { type, value }) {
      commit('set', { type, value })
    },
    open ({ commit }, { type }) {
      commit('open', { type })
    },
    close ({ commit }, { type }) {
      commit('close', { type })
    },
    toggle ({ commit }, { type }) {
      commit('toggle', { type })
    },
  },
  getters: {
    opened: (state) => ({ type }) => {
      return state[type].opened
    }
  }
}

export default store