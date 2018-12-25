import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// 测试
import router from './router/test'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  // render: h => h(App)
  template:`
    <div>你好呀</div>
  `
}).$mount('#app')
