import Vue from 'vue'
import Vuex from 'vuex'
import viewport from './modules/viewport'
import object from './modules/object'
import group from './modules/group'
import navigation from './modules/navigation'
import modals from './modules/modals'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    viewport,
    object,
    navigation,
    modals,
    group
  }
})

export default store