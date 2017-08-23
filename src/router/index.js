import Vue from 'vue'
import Router from 'vue-router'

import Ideas from 'components/Ideas/Index.vue'
import Prototypes from 'components/Prototypes/Index.vue'
import Code from 'components/Code/Index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  path: __dirname,
  routes: [
    {
      path: '/',
      name: 'front',
    },
    {
      path: 'ideas',
      name: 'ideas',
      component: Ideas,
      meta: {
        pageTitle: 'Ideas',
      },
    },
    {
      path: 'prototypes',
      name: 'prototypes',
      component: Prototypes,
      meta: {
        pageTitle: 'Prototypes',
      },
    },
    {
      path: 'code',
      name: 'code',
      component: Code,
      meta: {
        pageTitle: 'Code',
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
