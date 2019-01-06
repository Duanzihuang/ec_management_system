<template>
  <div>
    <span style="color:red;">动态组件1</span>
  </div>
</template>

<script>
export default {
  name: 'dynamic1',
  created () {
    console.log('---dynamic1 created---')
  },
  beforeDestroy () {
    console.log('---dynamic1 beforeDestroy---')
  }
}
</script>
