import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/account/login'
import layout from '../views/layout/layout'
import welcome from '@/views/welcome/welcome'
import user from '../views/user/user'
import rights from '../views/rights/rights'
import roles from '../views/roles/roles'
import category from '../views/goods/category'
import params from '../views/goods/params'
import goods from '../views/goods/goods'
import goodslist from '../views/goods/goodslist'
import addgoods from '../views/goods/addgoods'
import editgoods from '../views/goods/editgoods'

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
          path: 'rights',
          component: rights
        },
        {
          path: 'roles',
          component: roles
        },
        {
          path: 'categories',
          component: category
        },
        {
          path: 'params',
          component: params
        },
        {
          path: 'goods',
          component: goods,
          children: [
            {
              path: '',
              component: goodslist
            },
            {
              path: 'addgoods',
              name:'addgoods',
              component: addgoods
            },
            {
              path: 'eidtgoods',
              component: editgoods
            }
          ]
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
