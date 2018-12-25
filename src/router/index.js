import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/account/login'
import layout from '../views/layout/layout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    }
  ]
})

export default router
