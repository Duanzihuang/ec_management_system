<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{paths[0].name}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: paths[1].path }">{{paths[1].name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props:['paths']
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
</style>
