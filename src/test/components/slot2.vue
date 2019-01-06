<template>
    <div>
      我是slot2组件<br/><br/><br/>

      <slot_common :url="url">
          <!-- <template slot="footer">
              <h1 style="color:purple;">myFooter</h1>
          </template>
          <template slot="header">
              <h1 style="color:red;">这个是给header展示用的</h1>
          </template> -->

          <h1 style="color:purple;" slot="footer">myFooter</h1>
          <p style="color:blue;" slot="header">这个是给header展示用的</p>
         slot2222 登录的是 {{username}}

         <template slot="myButton">
            上传啊
         </template>
      </slot_common>
    </div>
  </template>

<script>
import slot_common from './slot_common'
export default {
  data () {
    return {
      username: '段子黄666',
      url: 'http://www.baidu.com'
    }
  },
  components: {
    slot_common
  }
}
</script>
