<template>
  <div>
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click="dialogVisible4Add = true"
    >添加角色</el-button>
    <!-- 2.0 角色列表表格 -->
    <el-table
      :data="rolesList"
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="item in scope.row.children"
            :key="item.id"
            closable
          >
            <!-- 一级权限 -->
            <el-col :span="3">
              <el-tag
                type="primary"
                closable
                @close="deleteRights(scope.$index,scope.row.id,item.id)"
              >
                {{item.authName}}
              </el-tag>
              <i
                v-if="item.children.length > 0"
                class="el-icon-arrow-right arrow"
              ></i>
            </el-col>
            <!-- 二级&三级权限 -->
            <el-col :span="21">
              <el-row
                class="authlist"
                v-for="subitem in item.children"
                :key="subitem.id"
              >
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="deleteRights(scope.$index,scope.row.id,subitem.id)"
                  >
                    {{subitem.authName}}
                  </el-tag>
                  <i
                    v-if="subitem.children.length > 0"
                    class="el-icon-arrow-right arrow"
                  ></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="third in subitem.children"
                    :key="third.id"
                    @close="deleteRights(scope.$index,scope.row.id,third.id)"
                  >
                    {{third.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="400"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="330"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            plain
            icon="el-icon-edit"
            type="primary"
            @click="editRole(scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            plain
            icon="el-icon-delete"
            type="danger"
            @click="deleteRole(scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            plain
            icon="el-icon-check"
            type="warning"
            @click="grantRight(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 3.0 角色授权弹出框 -->
    <el-dialog
      title="给角色授权"
      :visible.sync="dialog4GrantVisible"
      width="60%"
    >
      <el-tree
        ref="tree"
        :data="treeRightsList"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKeys"
        default-expand-all
        :props="defaultProps"
      >
      </el-tree>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog4GrantVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitGrant"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 4.0 添加角色弹出框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible4Add"
      width="50%"
    >
      <el-form
        :model="addRoleObj"
        :rules="rules"
        ref="addRoleRef"
        label-width="100px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input v-model="addRoleObj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleObj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRole"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 5.0 修改角色弹出框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible4Edit"
      width="50%"
    >
      <el-form
        :model="editRoleObj"
        :rules="rules"
        ref="editRoleRef"
        label-width="100px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input v-model="editRoleObj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleObj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Edit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditRole"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [], // 角色列表
      treeRightsList: [], // 权限树形数据
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      checkedKeys: [], // 被选中的keys，要和node-key一起使用
      dialog4GrantVisible: false, // 给角色授权
      roleId: -1, //角色ID,
      dialogVisible4Add: false, //添加角色
      dialogVisible4Edit: false, //修改角色弹出框
      addRoleObj: {
        roleName: '', // 角色名称
        roleDesc: '' // 角色描述
      },
      editRoleObj: {
        roleId: '', // 角色Id
        roleName: '', // 角色名称
        roleDesc: '' // 角色描述
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRolesListData()
  },
  methods: {
    async getRolesListData() {
      const result = await this.$axios.get('roles')

      this.rolesList = result.data.data
    },
    // 删除角色下面的权限
    deleteRights(index, roleId, rightId) {
      const url = `roles/${roleId}/rights/${rightId}`

      this.$axios.delete(url).then(response => {
        this.$message({
          message: response.data.meta.msg,
          type: 'success'
        })

        // 设置删除之后的数据
        this.rolesList[index].children = response.data.data
      })
    },
    // 递归获取角色已经授权的权限
    _getRoleGrantedRight(grantedRights, checkedKeys) {
      grantedRights.forEach(item => {
        if (!item.children) {
          checkedKeys.push(item.id)
        } else {
          // 递归获取角色已经授权的权限
          this._getRoleGrantedRight(item.children, checkedKeys)
        }
      })
    },
    // 授权
    async grantRight(role) {
      this.roleId = role.id
      // 设置选中的数据
      this.checkedKeys = []

      this._getRoleGrantedRight(role.children, this.checkedKeys)
      /**
      role.children.forEach(item => {
        if (item.children.length > 0) {
          item.children.forEach(subitem => {
            if (subitem.children.length > 0) {
              subitem.children.forEach(last => {
                this.checkedKeys.push(last.id)
              })
            }
          })
        }
      })
      */

      // 获取所有权限树
      const response = await this.$axios.get('rights/tree')
      this.treeRightsList = response.data.data

      // 显示
      this.dialog4GrantVisible = true
    },
    // 确认授权
    async submitGrant() {
      // issue https://segmentfault.com/q/1010000012309004
      // issue https://www.cnblogs.com/qing619/p/8144584.html
      //1.获取选中的keys
      // 选中的节点
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 半选中的节点
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

      // 需要提交给后台的全部节点
      const keys = checkedKeys.concat(halfCheckedKeys)

      //2.发送请求给后台
      const res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })

      //3.提示 & 关闭弹窗
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })

      this.dialog4GrantVisible = false

      //4.刷新列表
      this.getRolesListData()
    },
    // 添加角色
    addRole() {
      this.$refs.addRoleRef.validate(valid => {
        if (valid) {
          this.$axios.post('roles', this.addRoleObj).then(response => {
            if (response.data.meta.status === 201) {
              this.$message({
                message: response.data.meta.msg,
                type: 'success'
              })

              this.dialogVisible4Add = false

              this.getRolesListData()
            }
          })
        }
      })
    },
    // 根据Id查询角色信息并且显示
    async editRole(roleId) {
      // 根据id查询角色
      const response = await this.$axios.get(`roles/${roleId}`)
      // 给editRoleObj 赋值
      this.editRoleObj.roleId = roleId
      this.editRoleObj.roleName = response.data.data.roleName
      this.editRoleObj.roleDesc = response.data.data.roleDesc

      // 显示弹框
      this.dialogVisible4Edit = true
    },
    // 提交修改
    submitEditRole() {
      this.$refs.editRoleRef.validate(async valid => {
        if (valid) {
          const response = await this.$axios.put(
            `roles/${this.editRoleObj.roleId}`,
            this.editRoleObj
          )

          if (response.data.meta.status === 200) {
            this.$message({
              message: response.data.meta.msg,
              type: 'success'
            })

            this.getRolesListData()

            this.dialogVisible4Edit = false
          }
        }
      })
    },
    // 删除用户id
    deleteRole(roleId) {
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const response = await this.$axios.delete(`roles/${roleId}`)

          if (response.data.meta.status === 200) {
            this.$message({
              message: response.data.meta.msg,
              type: 'success'
            })

            this.getRolesListData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
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
.el-tag {
  margin-left: 5px;
}
.authlist {
  border-top: solid 1px #d3dce6;
  padding-bottom: 5px;
}
.arrow {
  font-size: 16px;
  font-weight: bold;
}
</style>
