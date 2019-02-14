<template>
  <div>
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.0 权限列表表格 -->
    <el-table
      :data="rightsList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="层级"
        width="100"
      >
        <template slot-scope="scope">
          {{scope.row.level | filterLevel}}
        </template>
        <!--
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else-if="scope.row.level==='2'">三级</span>
        </template>
        -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  // 过滤器
  filters:{
    filterLevel(input){
      if (input === '0'){
        return '一级'
      } else if (input === '1'){
        return '二级'
      } else if (input === '2') {
        return '三级'
      }
    }
  },
  created() {
    this.getRightsListData()
  },
  methods: {
    async getRightsListData() {
      const result = await this.$axios.get('rights/list')

      this.rightsList = result.data.data
    },
    // filterHandler(value, row, column) {
    //     console.log(value)
    //     return "好多级呀"
    // }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  background-color: #d3dce6;
}
</style>
