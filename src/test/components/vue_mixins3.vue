<template>
  <div>
    测试全局混入
  </div>
</template>

<script>
  import Vue from 'vue'

  // 为自定义的选项 'myOption' 注入一个处理器。
  Vue.mixin({
    created: function () {
      var myOption = this.$options.myOption
      if (myOption) {
        console.log("11111111111111")
        console.log(myOption)
      }
    }
  })

  // Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  //   // return mergedVal
  //   console.log(toVal,fromVal)

  //   return fromVal + " ---test"
  // }

  var strategies = Vue.config.optionMergeStrategies
  strategies.myOption = strategies.methods

  export default {
    // myOption: 'hello this is myOptions'
    myOption: {
      name:'小明',
      age:30
    }
  }
</script>
