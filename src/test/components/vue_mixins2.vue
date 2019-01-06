<!-- 测试混入 -->
<template>
    <div>
        mixins 2
    </div>
  </template>

<script>
import myMixins from '../mixins/'

export default {
  data () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  mixins: [myMixins],
  created () {
    console.log(this.$data)
  }
}
</script>
