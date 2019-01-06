import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

// 测试
// import router from './router/test'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.baseURL = 'http://39.108.131.40:8888/api/private/v1/'
Vue.prototype.$axios = axios
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
  // template:`
  //   <div>你好呀</div>
  // `
}).$mount('#app')
