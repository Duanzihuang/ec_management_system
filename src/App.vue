<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
/* 导入字体文件 */
@import './assets/iconfont/iconfont.css';

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: hidden;
}
#app {
  height: 100%;
}
.el-breadcrumb {
  background-color: #d3dce6;
  height: 50px;
  line-height: 50px !important;
  padding-left: 10px;
}
.search {
  width: 300px !important;
}
</style>
