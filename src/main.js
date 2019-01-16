import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from 'axios'
// 拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem('mytoken')) {
      config.headers['Authorization'] = localStorage.getItem('mytoken')
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
axios.defaults.baseURL = 'http://huangjiangjun.top:8888/api/private/v1/'
Vue.prototype.$axios = axios

// 测试
// import router from './router/test'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
  // template:`
  //   <div>你好呀</div>
  // `
}).$mount('#app')
