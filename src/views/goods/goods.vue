<template>
  <div>
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
</style>
