<template>
  <div>
    <div class="title">修改商品信息</div>
    <!-- 1.0步骤条 -->
    <el-steps
      :space="200"
      :active="active"
      finish-status="success"
    >
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 2.0 左侧tabl栏目 -->
    <el-form
      :model="goodsObj"
      :rules="rules"
      ref="goodsForm"
      label-width="150px"
    >
      <el-tabs
        @tab-click="tabClick"
        value="base"
        tab-position="left"
      >
        <el-tab-pane name="base" label="基本信息">
          <el-form-item
            label="商品名称"
            prop="goods_name"
          >
            <el-input v-model="goodsObj.goods_name"></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格"
            prop="goods_price"
          >
            <el-input v-model="goodsObj.goods_price"></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量"
            prop="goods_number"
          >
            <el-input v-model="goodsObj.goods_number"></el-input>
          </el-form-item>
          <el-form-item
            label="商品分类"
            prop="goods_cat"
          >
            <el-cascader
              :options="options"
              v-model="goods_cat_array"
              placeholder="请选择分类"
              :show-all-levels="false"
              :props="props"
              @change="selectCategory"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio
              v-model="goodsObj.is_promote"
              :label="1"
              border
            >是</el-radio>
            <el-radio
              v-model="goodsObj.is_promote"
              :label="0"
              border
            >否</el-radio>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="商品参数"
          name="param"
        >
          <!-- 动态参数 -->
          <el-form-item
            v-for="item in dparams"
            :key="item.attr_id"
            :label="item.attr_name"
          >
            <!-- <el-checkbox
              @change="unSelectDynimacParams(index,item.attr_vals)"
              v-for="(subitem,index)  in item.attr_vals"
              :key="index"
              :label="subitem"
              border
            ></el-checkbox> -->
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                v-for="(subitem,index) in item.attr_vals"
                :key="index"
                :label="subitem"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="商品属性"
          name="property"
        >
          <!-- 静态属性 -->
          <el-form-item
            v-for="item in sproperties"
            :key="item.attr_id"
            :label="item.attr_name"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="picture" label="商品图片">
          <el-upload
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :headers="headers"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            class="upload-demo"
            list-type="picture"
            :file-list="fileList"
          >
            <el-button
              type="success"
              plain
              icon="el-icon-upload"
            >上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="content" label="商品内容">
          <quill-editor v-model="goodsObj.goods_introduce"
                ref="myQuillEditor">
          </quill-editor>
        </el-tab-pane>

      </el-tabs>
    </el-form>
    <!-- 3.0 底部菜单按钮 -->
    <div class="footer">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button
        @click="editGoods"
        type="primary"
      >修改</el-button>
    </div>
    <!-- 4.0 图片预览对话框 -->
    <el-dialog
      :visible.sync="dialogVisibleForPreview"
      width="50%"
    >
      <img
        :src="previewImg"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
// 导入富文本插件
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data(){
    return {
      active:0, //
      // 校验规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      },
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      cat_id: null, //分类id
      fileList:[],//上传文件的列表
      goods_cat_array:[], //商品分类数组
      dparams: [], //动态参数数组
      sproperties: [], //静态属性数组
      headers: {
        Authorization: localStorage.getItem('mytoken')
      },
      previewImg: '', //图片预览地址
      dialogVisibleForPreview: false, //图片预览地址
      goodsObj:{} //商品对象，更改之后需要提交给服务器
    }
  },
  created(){
    // 加载分类数据
    this.getCategoriesData()

    // 加载商品数据
    this.getGoodsData()
  },
  methods:{
    // 加载商品数据
    async getGoodsData(){
      const res = await this.$axios.get(`goods/${this.$route.query.goods_id}`)
      // console.log(res.data.data)
      // 原来的分类id
      this.cat_id = res.data.data.cat_id
      // 设置分类的默认选中项
      // res.data.data.goods_cat = [res.data.data.cat_one_id,res.data.data.cat_two_id,res.data.data.cat_three_id]
      this.goods_cat_array = [res.data.data.cat_one_id,res.data.data.cat_two_id,res.data.data.cat_three_id]

      // 已上传图片列表
      if (res.data.data.pics){
        res.data.data.pics.forEach((item,index) => {
          item.url = item.pics_mid_url
          item.name = `第${index+1}张`
        })
        this.fileList = res.data.data.pics
      }

      // 赋值商品数据
      this.goodsObj = res.data.data
    },
    // 加载分类数据
    async getCategoriesData() {
      const res = await this.$axios.get(`categories`, {
        params: {
          type: 3
        }
      })

      this.options = res.data.data
    },
    // 选择分类
    selectCategory(val) {
      if (val.length < 3) {
        this.$message.error('请选择三级分类')
        return
      }

      // 添加商品分类
      this.goodsObj.goods_cat = val.join(',')

      // 给分类id重新赋值
      this.cat_id = val[val.length - 1]
    },
    // 获取动态参数或静态属性
    async getDynamicParamsOrStaticPropertiesData(type) {
      const res = await this.$axios.get(
        `categories/${this.cat_id}/attributes`,
        {
          params: {
            sel: type === 'param' ? 'many' : 'only'
          }
        }
      )

      switch (type) {
        case 'param':
          res.data.data.forEach(item => {
            if (item.attr_vals.trim().length > 0) {
              item.attr_vals = item.attr_vals.split(',')
            } else {
              item.attr_vals = []
            }
          })
          this.dparams = res.data.data
          break

        case 'property':
          this.sproperties = res.data.data
          break

        default:
          break
      }
    },
    // 不选择动态参数下面的某个属性
    // unSelectDynimacParams(index, attr_vals) {
    //   attr_vals.splice(index, 1)
    // },
    tabClick(val) {
      switch (val.name) {
        case 'base':
          this.active = 0
          break;

        case 'param':
          this.active = 1
          break;

        case 'property':
          this.active = 2
          break;

        case 'picture':
          this.active = 3
          break;

        case 'content':
          this.active = 4
          break;

        default:
          break;
      }
      if (val.name === 'param' || val.name === 'property') {
        // 加载商品参数 或 商品属性
        if (!this.goodsObj.cat_id) {
          this.$message.error('请选择分类')
          return
        }

        // 分类id没变
        if (this.cat_id===this.goodsObj.cat_id) {
          // 给动态参数和静态属性赋值

          // if (this.dparams.length > 0 || this.sproperties.length > 0) return
          this.dparams = this.goodsObj.attrs.filter(item=>{
            return item.attr_sel === 'many'
          })

          this.dparams.forEach(item => {
            // if (item.attr_vals && item.attr_vals.trim().length > 0) {
              // item.attr_vals = item.attr_vals.split(',')
              item.attr_vals = item.attr_value.split(',')
            // } else {
              // item.attr_vals = []
            // }
          })

          this.sproperties = this.goodsObj.attrs.filter(item => {
            return item.attr_sel === 'only'
          })

          // 设置静态资源数组的值
          this.sproperties.forEach(item =>{
            // if(item.attr_vals && item.attr_vals.trim().length === 0){
              item.attr_vals = item.attr_value
            // }
          })
        } else {
          // 分类id变了
          this.getDynamicParamsOrStaticPropertiesData(val.name)
        }
      }
    },
    // 图片上传相关
    // 上传成功
    handleSuccess(response, file, fileList) {
      response.data.pic = response.data.tmp_path
      this.goodsObj.pics.push(response.data)

      // 重新赋值
      this.fileList = this.goodsObj.pics
      this.fileList.forEach((item,index) => {
          item.name = `第${index+1}张`
      })
    },
    handlePreview(file) {
      // 设置预览图片的url
      this.previewImg = file.url
      // 展示出来
      this.dialogVisibleForPreview = true
    },
    handleRemove(file, fileList) {
      let dIndex = -1
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      this.goodsObj.pics.some((item, index) => {
        if (file.url === item.url) {
          dIndex = index

          return true
        }
      })

      this.goodsObj.pics.splice(dIndex, 1)
    },
    // 修改商品
    editGoods(){
      this.$refs.goodsForm.validate(async valid => {
        if (valid) {
          // 准备好数据
          if(this.dparams.length > 0){
            // this.goodsObj.attrs = [...this.dparams,...this.sproperties]
          }

          this.goodsObj.attrs = this.dparams.concat(this.sproperties)

          // 商品分类
          // this.goodsObj.goods_cat = this.goodsObj.goods_cat.join(',')
          // console.log(this.goodsObj)

          const res = await this.$axios.put(`goods/${this.goodsObj.goods_id}`, this.goodsObj)
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })

            // 跳转到商品列表
            this.$router.push({name:'goodslist'})
          } else {
            this.$message.error(res.data.meta.msg);
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 45px;
  line-height: 45px;
  background-color: #d7e2ef;
  padding-left: 20px;
}
.el-steps {
  margin: 15px 0px;
  padding-left: 20px;
}
.footer {
  margin-top: 20px;
  text-align: center;
}
.el-tabs__item {
  margin-top: 15px;
}
.el-input {
  height: 20px;
  width: 600px;
}
.quill-editor{
  height: 400px;
}
</style>
