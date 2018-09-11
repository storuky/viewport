import Vue from 'vue'
import Vuetify from 'vuetify'
import vClickOutside from 'v-click-outside'

import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/styles.css'

import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(vClickOutside)

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default app