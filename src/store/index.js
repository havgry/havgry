import Vue from 'vue'
import Vuex from 'vuex'

import _isUndefined from 'lodash/isUndefined'

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
      document.title = `${(_isUndefined(title) ? '' : `${title} – `)}Havgry`
    },
    /* eslint-enabke no-param-reassign */
  },
})
