import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/account/login'
import layout from '../views/layout/layout'
import welcome from '@/views/welcome/welcome'
import user from '../views/user/user'
import goodslist from '../views/goods/goodslist'
import rights from '../views/rights/rights'
import roles from '../views/roles/roles'

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
      component: layout,
      redirect: '/',
      children: [
        {
          path: '',
          component: welcome
        },
        {
          path: 'users',
          component: user
        },
        {
          path: 'goodslist',
          component: goodslist
        },
        {
          path: 'rights',
          component: rights
        },
        {
          path: 'roles',
          component: roles
        }
      ]
    }
  ]
})

// 导航守卫进行权限判断
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('mytoken')) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
