const store = {
  namespaced: true,
  state: {
    list: [],
    selectedIds: []
  },
  mutations: {
    setList(state, objects) {
      state.list = objects
    },
    select (state, objectId) {
      if (!state.selectedIds.includes(objectId)) {
        state.selectedIds.push(objectId)
      }
    },
    deselect (state, objectId) {
      if (state.selectedIds.includes(objectId)) {
        state.selectedIds = state.selectedIds.filter(id => id != objectId)
      }
    },
    toggleSelection (state, objectId) {
      if (state.selected.includes(objectId)) {
        state.selectedIds = state.selectedIds.filter(id => id != objectId)
      } else {
        state.selectedIds.push(objectId)
      }
    },
    selectAll (state) {
      state.selectedIds = state.list.map(object => object.id)
    },
    deselectAll (state) {
      state.selectedIds = []
    },
    deleteSelected (state) {
      state.list = state.list.filter(object => !state.selectedIds.includes(object.id))
      state.selectedIds = []
    },
    update (state, {id, settings}) {
      const object = state.list.find(object => object.id == id)
      object.info.settings = settings
    },
    delete (state, id) {
      state.list = state.list.filter(object => id!=object.id)
    },
    update (state, params) {
      const object = state.list.find(object => object.id == params.id)
      Object.assign(object, params)
    }
  },
  actions: {
    setList({ commit }, objects) {
      commit('setList', objects)
    },
    select ({commit}, objectId) {
      commit('select', objectId)
    },
    selectAll ({commit}) {
      commit('selectAll')
    },
    deselectAll ({commit}) {
      commit('deselectAll')
    },
    deselect ({commit}, objectId) {
      commit('deselect', objectId)
    },
    toggleSelection ({commit}, objectId) {
      commit('toggleSelection', objectId)
    },
    deleteSelected ({commit}) {
      commit('deleteSelected')
    },
    update ({commit}, params) {
      commit('update', params)
    },
    delete ({ commit }, id) {
      commit('delete', id)
    },
    update ({ commit }, params) {
      commit('update', params)
    }
  },
  getters: {
    selectedIds (state) {
      return state.selectedIds
    },
    selected (state) {
      return state.list.filter(object => state.selectedIds.includes(object.id))
    },
    list (state) {
      return state.list
    }
  }
}

export default store