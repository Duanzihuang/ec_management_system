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
        @click="dialogVisible4Add = true"
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
        width="120"
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
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        width="150"
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
            @click="editUser(scope.row.id)"
          ></el-button>
          <el-button
            class="el-icon-delete"
            size="small"
            type="danger"
            plain
            @click="deleteUser(scope.row.id)"
          ></el-button>
          <el-button
            class="el-icon-check"
            size="small"
            type="warning"
            plain
            @click="assignRole(scope.row)"
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
    <!-- 新增用户弹出框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible4Add"
      width="50%"
    >
      <el-form
        :model="addUserObj"
        :rules="rules"
        ref="addUserRef"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="addUserObj.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="addUserObj.password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="addUserObj.email"></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input v-model="addUserObj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户弹出框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="dialogVisible4Edit"
      width="50%"
    >
      <el-form
        :model="editUserObj"
        :rules="rules"
        ref="editUserRef"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-tag type="info">{{editUserObj.username}}</el-tag>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="editUserObj.email"></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input v-model="editUserObj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Edit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditUser"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible4Grant"
      width="50%"
    >
      <el-form
        :model="editUserObj"
        :rules="rules"
        ref="editUserRef"
        label-width="120px"
      >
        <el-form-item label="当前的用户名：">
          {{grantUserName}}
        </el-form-item>
        <el-form-item label="请选择角色：">
          <el-select
            v-model="roleName"
            placeholder="请选择"
            @change="selectRole"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Grant = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAssignRole"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value || value.trim().lenght === 0) {
        return callback()
      }

      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

      if (reg.test(value)) {
        callback()
      } else {
        callback('邮箱不合法!')
      }
    }
    var checkMobile = (rule, value, callback) => {
      if (!value || value.trim().lenght === 0) {
        return callback()
      }

      var reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/

      if (reg.test(value)) {
        callback()
      } else {
        callback('手机号不合法!')
      }
    }
    return {
      query: '', //搜索关键字
      pagenum: 1, //当前页码
      pagesize: 5, //每页显示条数
      total: 0, //总条数
      userList: [], //用户列表
      dialogVisible4Add: false, //添加用户弹框显示
      dialogVisible4Edit: false, //修改用户弹框显示
      dialogVisible4Grant: false, //分配角色
      addUserObj: {
        // 添加用户
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserObj: {},
      grantUserName: '', // 被授权的用户名
      roleName: '', // 之前授权的角色名称
      roleId: -1, // 选中的角色id
      roleList: [], //角色列表
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      }
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
      const result = await this.$axios.put(
        `users/${user.id}/state/${user.mg_state}`
      )

      if (result.data.meta.status === 200) {
        this.$message({
          message: '更改状态成功',
          type: 'success'
        })
      }
    },
    // 新增用户
    addUser() {
      this.$refs.addUserRef.validate(async valid => {
        if (valid) {
          const response = await this.$axios.post('users', this.addUserObj)

          if (response.data.meta.status === 201) {
            this.$message({
              message: response.data.meta.msg,
              type: 'success'
            })

            this.dialogVisible4Add = false

            // 重新获取用户列表
            this.getUserListData()
          } else {
            this.$message({
              message: response.data.meta.msg,
              type: 'error'
            })
          }
        }
      })
    },
    // 修改用户
    async editUser(userId) {
      const res = await this.$axios.get(`users/${userId}`)

      this.editUserObj = res.data.data

      this.dialogVisible4Edit = true
    },
    // 提交修改用户
    submitEditUser() {
      this.$refs.editUserRef.validate(async valid => {
        if (valid) {
          const res = await this.$axios.put(
            `users/${this.editUserObj.id}`,
            this.editUserObj
          )

          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: 'success'
            })

            this.dialogVisible4Edit = false

            // 重新获取用户列表
            this.getUserListData()
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error'
            })
          }
        }
      })
    },
    // 删除用户
    deleteUser(userId) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const response = await this.$axios.delete(`users/${userId}`)

          if (response.data.meta.status === 200) {
            this.$message({
              message: response.data.meta.msg,
              type: 'success'
            })

            // 重新获取用户列表
            this.pagenum = 1
            this.getUserListData()
          }
        })
        .catch(() => {})
    },
    // 分配角色
    async assignRole(user) {
      this.grantUserName = user.username
      this.grantUserId = user.id
      this.roleId = user.role_id
      this.roleName = user.role_name

      // 获取所有角色列表
      const res = await this.$axios.get('roles')
      this.roleList = res.data.data

      this.dialogVisible4Grant = true
    },
    // 选择角色
    selectRole(roleId) {
      this.roleId = roleId
    },
    // 提交分配角色
    async submitAssignRole() {
      if (!this.roleId) {
        this.$message({
          message: '请选择角色!',
          type: 'warning'
        })
        return
      }

      // 分配角色
      const res = await this.$axios.put(`users/${this.grantUserId}/role`, {
        rid: this.roleId
      })

      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogVisible4Grant = false
        // 重新查询
        this.getUserListData()
        // 提示
        this.$message({
          message: res.data.meta.msg,
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
