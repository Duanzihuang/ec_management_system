<template>
  <div>
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.0 级联菜单 -->
    <el-cascader
      :options="categires"
      :props="props"
      :show-all-levels="false"
      v-model="selectedOptions"
      @change="categoryChange"
    ></el-cascader>
    <!-- 3.0 选项卡 -->
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="tabClick"
    >
      <el-tab-pane
        label="动态参数"
        name="dynamic"
      >
        <div>
          <el-button
            type="success"
            plain
            @click="dialogVisible4AddDynamicParams=true"
          >添加动态参数</el-button>
          <el-table
            border
            :data="dynamicParams"
            v-loading="dynamicLoading"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 1.0 生成标签数组 -->
                <el-tag
                  closable
                  :key="index"
                  @close="deleteDynamicAttr(index,scope.row)"
                  v-for="(val,index) in scope.row.attr_vals"
                >
                  {{val}}
                </el-tag>
                <!-- 2.0 添加动态属性按钮 -->
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  placeholder="请输入按回车添加"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+ 添加值</el-button>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="#"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
              width="500"
            >
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <el-button
                    icon="el-icon-edit"
                    size="small"
                    type="primary"
                    @click="updateDynamicParams(scope.row)"
                    plain
                  ></el-button>
                  <el-button
                    icon="el-icon-delete"
                    size="small"
                    type="danger"
                    @click="deleteDynamicParams(scope.row.attr_id)"
                    plain
                  ></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="静态属性"
        name="static"
      >
        <div>
          <el-button
            type="success"
            plain
            @click="dialogVisible4AddStaticProperty=true"
          >添加静态属性</el-button>
          <el-table
            border
            :data="staticProperties"
            v-loading="staticLoading"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="#"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="250"
            >
            </el-table-column>
            <el-table-column
              prop="attr_vals"
              label="属性值"
              width="350"
            >
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <el-button
                    icon="el-icon-edit"
                    size="small"
                    type="primary"
                    @click="updateStaticProperty(scope.row.attr_id)"
                    plain
                  ></el-button>
                  <el-button
                    icon="el-icon-delete"
                    size="small"
                    type="danger"
                    @click="deleteStaticProperty(scope.row.attr_id)"
                    plain
                  ></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 4.0 添加动态参数对话框 -->
    <el-dialog
      title="添加动态参数"
      :visible.sync="dialogVisible4AddDynamicParams"
      width="50%"
    >
      <el-form
        :model="dynamicParamsObj"
        :rules="rules"
        ref="addDynamicParamsForm"
        label-width="100px"
      >
        <el-form-item
          label="参数名称"
          prop="attr_name"
        >
          <el-input v-model="dynamicParamsObj.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4AddDynamicParams = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAddDynamicParams"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改动态参数 -->
    <el-dialog
      title="修改动态参数"
      :visible.sync="dialogVisible4EditDynamicParams"
      width="50%"
    >
      <el-form
        :model="dynamicParamsObj"
        :rules="rules"
        ref="editDynamicParamsForm"
        label-width="100px"
      >
        <el-form-item
          label="参数名称"
          prop="attr_name"
        >
          <el-input v-model="dynamicParamsObj.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4EditDynamicParams = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditDynamicParams"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加静态属性 -->
    <el-dialog
      title="添加属性"
      :visible.sync="dialogVisible4AddStaticProperty"
      width="50%"
    >
      <el-form
        :model="staticPropertyObj"
        :rules="rules"
        ref="addStaticPropertyRef"
        label-width="100px"
      >
        <el-form-item
          label="属性名称"
          prop="attr_name"
        >
          <el-input v-model="staticPropertyObj.attr_name"></el-input>
        </el-form-item>
        <el-form-item
          label="属性值"
          prop="attr_vals"
        >
          <el-input v-model="staticPropertyObj.attr_vals"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4AddStaticProperty = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAddStaticProperty"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改静态属性 -->
    <el-dialog
      title="修改属性"
      :visible.sync="dialogVisible4EditStaticProperty"
      width="50%"
    >
      <el-form
        :model="staticPropertyObj"
        :rules="rules"
        ref="editStaticPropertyRef"
        label-width="100px"
      >
        <el-form-item
          label="属性名称"
          prop="attr_name"
        >
          <el-input v-model="staticPropertyObj.attr_name"></el-input>
        </el-form-item>
        <el-form-item
          label="属性值"
          prop="attr_vals"
        >
          <el-input v-model="staticPropertyObj.attr_vals"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4EditStaticProperty = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditStaticProperty"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ],
        attr_vals: [
          { required: true, message: '请输入参数值', trigger: 'blur' }
        ]
      },
      categires: [], // 分类菜单，展示三级的
      props: {
        label: 'cat_name',
        value: 'cat_id'
      },
      cat_id: '', // 当前选中的三级分类id
      selectedOptions: [], // 选中项
      activeName: 'dynamic',
      dynamicParams: [], //动态参数
      dynamicLoading: false, //是否正在加载动态参数
      staticProperties: [], //静态属性
      staticLoading: false, //是否正在加载静态属性
      type: '', //此刻选中的类别【动态参数，静态属性】
      inputVisible: false, //动态参数添加框，是否可见
      inputValue: '', //动态参数添加的值，是否可见
      dialogVisible4AddDynamicParams: false,
      dialogVisible4EditDynamicParams: false,
      dynamicParamsObj: {
        attr_id: '', //动态参数id
        attr_name: '' // 动态参数名称
      },
      dialogVisible4AddStaticProperty: false,
      dialogVisible4EditStaticProperty: false,
      staticPropertyObj: {
        attr_name: '', //属性名称
        attr_vals: '' //属性值
      }
    }
  },
  created() {
    this.getCategoriesData()
  },
  methods: {
    // 获取分类数据
    async getCategoriesData() {
      const res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })

      this.categires = res.data.data
      // console.log(this.categires[0].cat_name)
      // console.log(this.categires[0].children[0].cat_name)
      // console.log(this.categires[0].children[0].children[0].cat_name)
      // 设置选中项
      this.selectedOptions = [
        this.categires[0].cat_id,
        this.categires[0].children[0].cat_id,
        this.categires[0].children[0].children[0].cat_id
      ]

      // 设置默认三级分类id为曲面电视的分类id
      this.cat_id = this.categires[0].children[0].children[0].cat_id

      // 查询曲面电视的分类id下面的动态参数
      this.getThreeLevelDynamicParams()
    },
    // 获取选中三级分类下面的动态参数
    async getThreeLevelDynamicParams() {
      // 开始Loading
      this.dynamicLoading = true

      const res = await this.$axios.get(
        `categories/${this.cat_id}/attributes`,
        {
          params: {
            sel: 'many'
          }
        }
      )

      // 停止Loading
      this.dynamicLoading = false

      res.data.data.forEach(item => {
        if (item.attr_vals.trim().length === 0) {
          item.attr_vals = []
        } else {
          item.attr_vals = item.attr_vals.split(',')
        }
      })

      // 赋值给三级分类的动态参数数组
      this.dynamicParams = res.data.data
    },
    // 获取选中三级分类下面的静态属性
    async getThreeLevelStaticProperties() {
      // 开始Loading
      this.staticLoading = true

      const res = await this.$axios.get(
        `categories/${this.cat_id}/attributes`,
        {
          params: {
            sel: 'only'
          }
        }
      )

      // 停止Loading
      this.staticLoading = false

      // 赋值给三级分类的静态属性数组
      this.staticProperties = res.data.data
    },
    // tab被选中了
    tabClick(obj) {
      this.type = obj.name
      switch (obj.name) {
        case 'dynamic':
          this.getThreeLevelDynamicParams()
          break
        case 'static':
          this.getThreeLevelStaticProperties()
          break
      }
    },
    // 分类改变了
    categoryChange(val) {
      if (val.length < 3) {
        this.$message.error('请选择三级分类查询哦~')
        return
      }

      // 设置三级分类id
      this.cat_id = val[2]

      switch (this.type) {
        case 'dynamic':
          this.getThreeLevelDynamicParams()
          break
        case 'static':
          this.getThreeLevelStaticProperties()
          break
      }
    },
    // 显示输入框
    showInput() {
      this.inputVisible = true
    },
    // 动态添加值
    handleInputConfirm(dparams) {
      if (this.inputValue.trim().length === 0) {
        this.$message({
          type: 'warning',
          message: '请输入内容哦~'
        })
        return
      }

      // 隐藏 input
      this.inputVisible = false

      // 更改 attr中attr_vals的值
      dparams.attr_vals.push(this.inputValue)

      this.updateDynamicParam(dparams)
    },
    // 删除动态参数
    deleteDynamicAttr(index, dparams) {
      dparams.attr_vals.splice(index, 1)

      this.updateDynamicParam(dparams)
    },
    // 更新动态参数
    async updateDynamicParam(dparams) {
      // 调用接口，进行添加/删除
      const url = `categories/${this.cat_id}/attributes/${dparams.attr_id}`

      const res = await this.$axios.put(url, {
        attr_sel: 'many',
        attr_name: dparams.attr_name,
        attr_vals: dparams.attr_vals.join(',')
      })

      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
    },
    // 添加动态参数
    submitAddDynamicParams() {
      this.$refs.addDynamicParamsForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post(
            `categories/${this.cat_id}/attributes`,
            {
              attr_name: this.dynamicParamsObj.attr_name,
              attr_sel: 'many'
            }
          )

          if (res.data.meta.status === 201) {
            this.dialogVisible4AddDynamicParams = false

            this.getThreeLevelDynamicParams()

            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          }
        }
      })
    },
    // 修改动态参数
    async updateDynamicParams(dparams) {
      this.dynamicParamsObj.attr_id = dparams.attr_id

      const res = await this.$axios.get(
        `categories/${this.cat_id}/attributes/${dparams.attr_id}`,
        {
          params: { attr_sel: 'many' }
        }
      )

      this.dynamicParamsObj.attr_name = res.data.data.attr_name

      this.dialogVisible4EditDynamicParams = true
    },
    // 更新
    submitEditDynamicParams() {
      this.$refs.editDynamicParamsForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.put(
            `categories/${this.cat_id}/attributes/${
              this.dynamicParamsObj.attr_id
            }`,
            {
              attr_name: this.dynamicParamsObj.attr_name,
              attr_sel: 'many'
            }
          )

          if (res.data.meta.status === 200) {
            this.dialogVisible4EditDynamicParams = false

            this.getThreeLevelDynamicParams()

            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          }
        }
      })
    },
    // 删除动态参数
    async deleteDynamicParams(attr_id) {
      const res = await this.$axios.delete(
        `categories/${this.cat_id}/attributes/${attr_id}`
      )

      if (res.data.meta.status === 200) {
        this.getThreeLevelDynamicParams()

        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
    },
    // 添加静态属性
    submitAddStaticProperty() {
      this.$refs.addStaticPropertyRef.validate(async valid => {
        const res = await this.$axios.post(
          `categories/${this.cat_id}/attributes`,
          {
            attr_sel: 'only',
            attr_name: this.staticPropertyObj.attr_name,
            attr_vals: this.staticPropertyObj.attr_vals
          }
        )

        if (res.data.meta.status === 201) {
          this.dialogVisible4AddStaticProperty = false

          this.getThreeLevelStaticProperties()

          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      })
    },
    // 修改静态属性
    async updateStaticProperty(attr_id) {
      this.staticPropertyObj.attr_id = attr_id

      const res = await this.$axios.get(
        `categories/${this.cat_id}/attributes/${attr_id}`
      )

      this.staticPropertyObj = res.data.data

      this.dialogVisible4EditStaticProperty = true
    },
    submitEditStaticProperty() {
      this.$refs.editStaticPropertyRef.validate(async valid => {
        if (valid) {
          const res = await this.$axios.put(
            `categories/${this.cat_id}/attributes/${
              this.staticPropertyObj.attr_id
            }`,
            {
              attr_sel: 'only',
              attr_name: this.staticPropertyObj.attr_name,
              attr_vals: this.staticPropertyObj.attr_vals
            }
          )

          if (res.data.meta.status === 200) {
            this.dialogVisible4EditStaticProperty = false

            this.getThreeLevelStaticProperties()

            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          }
        }
      })
    },
    // 删除静态属性
    async deleteStaticProperty(attr_id) {
      const res = await this.$axios.delete(
        `categories/${this.cat_id}/attributes/${attr_id}`
      )

      if (res.data.meta.status === 200) {
        this.getThreeLevelStaticProperties()

        this.$message({
          type: 'success',
          message: res.data.meta.msg
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
.el-table__expanded-cell {
  padding: 0px;
}
.el-tag {
  margin: 3px;
}
.input-new-tag {
  width: 150px;
}
</style>

