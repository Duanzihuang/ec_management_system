import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/account/login'
import layout from '../views/layout/layout'
import user from '../views/user/user'
import goodslist from '../views/goods/goodslist'

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
      redirect: '/layout/user',
      children: [
        {
          path: 'user',
          component: user
        },
        {
          path: 'goodslist',
          component: goodslist
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
