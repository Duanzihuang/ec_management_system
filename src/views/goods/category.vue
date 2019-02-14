<template>
  <div>
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.0 添加分类按钮 -->
    <div>
      <el-button
        type="success"
        plain
        @click="addCategory"
      >添加分类</el-button>
    </div>
    <!-- 3.0 树形表格 -->
    <dzh-tree-grid
      :columns="columns"
      :loading="loading"
      :dataSource="categories"
    >
      <template slot-scope="scope">
        <el-button plain title='修改商品分类'  type="primary" @click="editCategory(scope.row)" size="small" icon="el-icon-edit"></el-button>
        <el-button plain title='删除商品分类'  @click="deleteCategory(scope.row.cat_id)" type="danger" size="small" icon="el-icon-delete"></el-button>
      </template>
    </dzh-tree-grid>
    <!--
    <tree-grid
      :columns="columns"
      :loading="loading"
      :dataSource="categories"
      @showForm="editCategory"
      @deleteCate="deleteCategory"
    >
      <template slot-scope="scope">
        <el-button plain title='修改商品分类'  type="primary" @click="editCategory(scope.row)" size="small" icon="el-icon-edit"></el-button>
        <el-button plain title='删除商品分类'  type="danger" size="small" icon="el-icon-delete"></el-button>
      </template>
    </tree-grid>
    -->
    <!--
    <el-table :loading="loading" :data="categories" border>
      <el-tree-grid
          prop="cat_name"
          label="分类名称"
          treeKey="cat_id"
          parentKey="cat_pid"
          levelKey="cat_level"
          childKey="children"
          :indentSize="30"></el-tree-grid>
      <el-table-column
          prop="cat_level_name" label="级别" width="220"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain title='修改商品分类'  type="primary" @click="editCategory(scope.row)" size="small" icon="el-icon-edit"></el-button>
          <el-button plain title='删除商品分类'  type="danger" size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    -->
    <!-- 分页条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加分类弹出框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible4Add"
      width="50%"
    >
      <el-form
        :model="addCategoryObj"
        :rules="rules"
        ref="addCategoryForm"
        label-width="100px"
      >
        <el-form-item
          label="分类名称"
          prop="cat_name"
        >
          <el-input v-model="addCategoryObj.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            placeholder="默认创建一级分类"
            :options="options"
            :props="props"
            :show-all-levels="false"
            @change="selectCategory"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Add = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAddCategory"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible4Edit"
      width="50%"
    >
      <el-form
        :model="editCategoryObj"
        :rules="rules"
        ref="editCategoryForm"
        label-width="100px"
      >
        <el-form-item
          label="分类名称"
          prop="cat_name"
        >
          <el-input v-model="editCategoryObj.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Edit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditCategory"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import TreeGrid from '../../components/TreeGrid'
// import ElTreeGrid from 'element-tree-grid'

import DZHTreeGrid from 'dzh-tree-grid'

export default {
  components: {
    // TreeGrid
    // ElTreeGrid
    "dzh-tree-grid":DZHTreeGrid
  },
  data() {
    return {
      rules: {
        cat_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      dialogVisible4Add: false, //添加分类弹出框
      dialogVisible4Edit: false, //修改分类弹出框
      categories: [], // 分类数据列表
      loading: true, //正在加载中
      addCategoryObj: {
        // 添加分类对象
        cat_pid: 0, //默认是第一级
        cat_name: '',
        cat_level: 0 //默认添加一级分类
      },
      // 修改分类
      editCategoryObj: {
        cat_id: '',
        cat_name: ''
      },
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      options: [], //分类的选项
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        // {
        //   text: '是否有效',
        //   dataIndex:'cat_deleted'
        // },
        {
          label: '级别',
          prop: 'cat_level_name',
          // width: 500
        }
      ], //菜单列表
      pagenum: 1, //页码
      pagesize: 10, //页容量
      total: 0 //总条数
    }
  },
  created() {
    this.getCategoriesData()
  },
  methods: {
    // 获取商品分类数据
    async getCategoriesData() {
      const res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // 停止加载
      this.loading = false
      // 赋值给数组
      this.categories = res.data.data.result
      // 赋值给分类的数组
      this.options = res.data.data.result
      // 赋值给总数
      this.total = res.data.data.total
    },
    handleSizeChange(pagesize) {
      // 加载数据
      this.loading = true
      this.pagesize = pagesize
      this.pagenum = 1
      this.getCategoriesData()
    },
    handleCurrentChange(pagenum) {
      // 加载数据
      this.loading = true
      this.pagenum = pagenum
      this.getCategoriesData()
    },
    // 添加分类
    addCategory() {
      this.getSecondLevelCategories()

      this.dialogVisible4Add = true
    },
    // 加载添加分类时候的二级分类
    async getSecondLevelCategories() {
      this.options = []

      const res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })

      this.options = res.data.data
    },
    // 选择分类
    selectCategory(val) {
      if (val.length === 1) {
        this.addCategoryObj.cat_pid = val[0]
        this.addCategoryObj.cat_level = 1
      } else if (val.length === 2) {
        this.addCategoryObj.cat_pid = val[1]
        this.addCategoryObj.cat_level = 2
      } else {
        this.addCategoryObj.cat_level = 0
        this.addCategoryObj.cat_pid = 0
      }
    },
    // 提交分类
    submitAddCategory() {
      this.$refs.addCategoryForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('categories', this.addCategoryObj)

          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })

            this.dialogVisible4Add = false

            // 刷新
            this.getCategoriesData()
          }
        }
      })
    },
    // 编辑分类
    editCategory(category) {
      this.editCategoryObj = category

      this.dialogVisible4Edit = true
    },
    // 提交修改分类
    submitEditCategory() {
      this.$refs.editCategoryForm.validate(async valid => {
        if (valid) {
          if (this.editCategoryObj.cat_name.trim().length === 0) {
            this.$message.error('请输入分类名称')
            return
          }

          // 修改操作
          const res = await this.$axios.put(
            `categories/${this.editCategoryObj.cat_id}`,
            {
              cat_name: this.editCategoryObj.cat_name
            }
          )

          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })

            this.dialogVisible4Edit = false

            // 刷新
            this.getCategoriesData()
          }
        }
      })
    },
    // 删除分类
    async deleteCategory(cat_id) {
      const res = await this.$axios.delete(`categories/${cat_id}`)

      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })

        // 刷新
        this.getCategoriesData()
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
</style>

