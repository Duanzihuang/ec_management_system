<!-- 测试混入 -->
<template>
  <div>
    我是使用混入的组件1<br/>

    <button @click="fooMethod">混入对象的fooMethod</button>
    <button @click="bar">自己组件对象的bar</button>
    <button @click="conflicting">自己组件对象的conflicting</button>
  </div>
</template>

<script>
import myMixins from '../mixins/'

export default {
  mixins: [myMixins],
  created () {
    console.log('组件钩子被调用')
    console.log(this.$data)
  },
  methods: {
    bar: function () {
      console.log('self bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
}
</script>
