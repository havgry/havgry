import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './components/App.vue'
import router from './router'
import store from './store'

Vue.use(VueRouter)

sync(store, router)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
