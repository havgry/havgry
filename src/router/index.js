import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  path: __dirname,
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'front',
          meta: {
            front: true,
          },
        },
        {
          path: '/ideas',
          name: 'ideas',
          meta: {
            pageTitle: 'Ideas',
          },
        },
        {
          path: '/prototypes',
          name: 'prototypes',
          meta: {
            pageTitle: 'Prototypes',
          },
        },
        {
          path: '/code',
          name: 'code',
          meta: {
            pageTitle: 'Code',
          },
        },
      ],
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
