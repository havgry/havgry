import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  path: __dirname,
  routes: [
    {
      path: '/',
      name: 'front',
      meta: {
        pageTitle: 'Front',
      },
    },
  ],
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    router.app.$store.commit('setTitle', {
      title: to.meta.pageTitle,
    })
  })
})

export default router
