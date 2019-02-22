import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
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
import orders from '../views/order/Orders'
import reports from '../views/reports/reports'
*/

const login = () => import(/* webpackChunkName: "login" */'../views/account/login')
const layout = () => import(/* webpackChunkName: "layout" */'../views/layout/layout')
const welcome = () => import(/* webpackChunkName: "welcome" */'../views/welcome/welcome')
const user = () => import(/* webpackChunkName: "user" */'../views/user/user')
const rights = () => import(/* webpackChunkName: "rights" */'../views/rights/rights')
const roles = () => import(/* webpackChunkName: "roles" */'../views/roles/roles')
const category = () => import(/* webpackChunkName: "category" */'../views/goods/category')
const params = () => import(/* webpackChunkName: "params" */'../views/goods/params')
const goods = () => import(/* webpackChunkName: "goods" */'../views/goods/goods')
const goodslist = () => import(/* webpackChunkName: "goodslist" */'../views/goods/goodslist')
const addgoods = () => import(/* webpackChunkName: "addgoods" */'../views/goods/addgoods')
const editgoods = () => import(/* webpackChunkName: "editgoods" */'../views/goods/editgoods')
const orders = () => import(/* webpackChunkName: "orders" */'../views/order/Orders')
const reports = () => import(/* webpackChunkName: "reports" */'../views/reports/reports')

// 测试vuex
// const index = () => import(/* webpackChunkName: "index"*/'../test/vuex/components/index.vue')
// const mygoodslist = () => import(/* webpackChunkName: "goodslist"*/'../test/vuex/components/goodslist.vue')
// const goodscart = () => import(/* webpackChunkName: "goodscart"*/'../test/vuex/components/goodscart.vue')

import index from '../test/vuex/components/index'
import mygoodslist from '../test/vuex/components/goodslist'
import goodscart from '../test/vuex/components/goodscart'

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
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
      path: '/goods',
      name: 'index',
      component: index,
      children:[
        {
          path: '',
          name: 'goodslist',
          component: mygoodslist
        },
        {
          path: 'goodslist',
          name: 'goodslist',
          component: mygoodslist
        },
        {
          path: 'goodscart',
          name: 'goodscart',
          component: goodscart
        }
      ]
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
          path: 'orders',
          component: orders
        },
        {
          path: 'reports',
          component: reports
        },
        {
          path: 'goods',
          component: goods,
          children: [
            {
              path: '',
              name:'goodslist',
              component: goodslist
            },
            {
              path: 'addgoods',
              name:'addgoods',
              component: addgoods
            },
            {
              path: 'editgoods',
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
  if (to.path === '/login' || to.path==='/goods' || to.path === '/goods/goodslist' || to.path === '/goods/goodscart') {
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
