import Vue from 'vue'
import Router from 'vue-router'

import vue_mixins1 from '../test/components/vue_mixins1'
import vue_mixins2 from '../test/components/vue_mixins2'
import vueMixins3 from '../test/components/vue_mixins3'
import slot1 from '../test/components/slot1'
import slot2 from '../test/components/slot2'
import slot3 from '../test/components/slot3'
import slot4 from '../test/components/slot4'
import dynamic from '../test/components/dynamic'
import async from '../test/components/async'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 测试vue混入
    {
      path: '/vue_mixins1',
      component: vue_mixins1
    },
    {
      path: '/vue_mixins2',
      component: vue_mixins2
    },
    {
      path: '/vue_mixins3',
      component: vueMixins3
    },
    // 测试插槽
    {
      path: '/slot1',
      component: slot1
    },
    {
      path: '/slot2',
      component: slot2
    },
    {
      path: '/slot3',
      component: slot3
    },
    {
      path: '/slot4',
      component: slot4
    },
    // 测试动态&异步组件
    {
      path: '/dynamic',
      component: dynamic
    },
    {
      path: '/async',
      component: async
    }
  ]
})

export default router
