<template>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索框和按钮 -->
    <div>
      <el-input
        placeholder="请输入内容"
        v-model="query"
        @keyup.enter.native="search"
        class="search"
      >
        <el-button
          @click="search"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
      >添加用户</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            class="el-icon-edit"
            size="small"
            type="primary"
            plain
          ></el-button>
          <el-button
            class="el-icon-delete"
            size="small"
            type="danger"
            plain
          ></el-button>
          <el-button
            class="el-icon-check"
            size="small"
            type="warning"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '', //搜索关键字
      pagenum: 1, //当前页码
      pagesize: 5, //每页显示条数
      total: 0, //总条数
      userList: []
    }
  },
  created() {
    this.getUserListData()
  },
  methods: {
    async getUserListData() {
      const result = await this.$axios.get('users', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        }
      })

      // 赋值给模型
      this.userList = result.data.data.users
      this.total = result.data.data.total
    },
    // 页容量改变了
    handleSizeChange(size) {
      this.pagesize = size
      this.pagenum = 1
      this.getUserListData()
    },
    // 页码改变了
    handleCurrentChange(page) {
      this.pagenum = page
      this.getUserListData()
    },
    // 搜索
    search() {
      this.getUserListData()
    },
    // 更改用户状态
    async changeState(user) {
      console.log(user)
      const result = await this.$axios.put(
        `users/${user.id}/state/${user.mg_state}`
      )

      if (result.data.meta.status === 200) {
        this.$message({
          message: '更改状态成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.el-pagination {
  background-color: #d3dce6;
  padding-top: 10px;
  height: 35px;
  line-height: 35px;
}
.search {
  width: 300px;
}
</style>
