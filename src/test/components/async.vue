<template>
  <div>
    测试异步组件...<br /><br />
    <!-- <async-example></async-example> -->

    <!-- <async-webpack-example></async-webpack-example> -->

    <my-component></my-component>
  </div>
</template>

<script>
  import Vue from 'vue' /**'./my-async-component')
  )
  **/

  // 直接定义
  /**
  Vue.component('async-example', function (resolve, reject) {
    setTimeout(function () {
      // 向 `resolve` 回调传递组件定义
      resolve({
        //template: '<div>I am async component!</div>'
        render(createElement){
          return createElement('div',{style:{color:'yellowgreen'}},'我是一个好人!!!')
        }
      })
    }, 3000)
  })
  **/

  // 导入异步组件1
  /**
  Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 `require` 语法将会告诉 webpack
    // 自动将你的构建代码切割成多个包，这些包
    // 会通过 Ajax 请求加载
    require(['./my-async-component.vue'], resolve)
  })
  */

  //导入异步组件1
  /**
  Vue.component(
    'async-webpack-example',
    // 这个 `import` 函数会返回一个 `Promise` 对象。
    () => import(/* webpackChunkName: "my-async-component666" */ /**
  import LoadingComponent from './loading'
  import ErrorComponent from './error'

  const AsyncComponent = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: import('./my-async-component.vue'),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
  })
  **/

  /**
  const FooComponent = {
    template:'<div>。。。我是异步组件啦。。。</div>'
  }

  const Foo = () => Promise.resolve({
    // template:'<div>。。。我是异步组件啦。。。</div>'
    // render:h => h(FooComponent)
    render:h => {
      return h('div',{style:{color:'red'}},'。。。我是异步组件啦。。。')
    }
   })
   **/

  const Foo = () =>
    import(/* webpackChunkName: "my-component123" */ './my-async-component')

  export default {
    components: {
      // 'my-component': () => import(/* webpackChunkName: "my-component" */'./my-async-component')
      // 'my-component':AsyncComponent
      'my-component': Foo
    }
  }
</script>
