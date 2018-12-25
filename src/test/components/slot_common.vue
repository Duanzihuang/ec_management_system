<template>
  <div>
    <div>start</div>
    <!-- <slot></slot> -->
    <!-- 具名插槽 -->
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <div>end</div>

    <button type="submit">
        <slot name="myButton">Submit</slot>
    </button>
  </div>
</template>

<script>
export default {
  data(){
        return {
          username:'段子黄',
          // url:'http://www.baidu.com'
        }
  }
}
</script>

<style scoped>
  div{
    color: green;
    font-size: 26px;
  }
</style>
