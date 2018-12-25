<template>
  <div>
    我是动态组件<br/><br/><br/>
    <button @click="componentId='dynamic1'">显示组件1</button>&nbsp;&nbsp;
    <!-- <button @click="showDynamic2">显示组件2</button><br/><br/> -->
    <button @click="componentId='dynamic2'">显示组件2</button><br/><br/>

    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
      <component :is="componentId"></component>
    </keep-alive>
  </div>
</template>

<script>
  import dynamic1 from './dynamic1'
  import dynamic2 from './dynamic2'
  export default {
    data(){
      return {
        componentId:''
      }
    },
    methods:{
      showDynamic2(){
        this.componentId = dynamic2
      }
    },
    components:{
      dynamic1,
      dynamic2
    }
  }
</script>
