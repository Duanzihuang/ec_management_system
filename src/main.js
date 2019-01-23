import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Sd2ZilSLMnz9yjesdPrrVl63onT8vQ56'
})

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

// 响应拦截器
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // token无效了
  if(response.data.meta.status === 400){
    // 跳转到login中去
    router.push('/login')
  }
  // console.log(response)
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})
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
