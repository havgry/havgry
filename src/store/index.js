import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    setTitle(state, payload) {
      const title = payload.title

      state.title = title
      document.title = `${title} – Havgry.com`
    },
    /* eslint-enabke no-param-reassign */
  },
})
