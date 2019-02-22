<template>
  <div>
    <el-table :data="goodsList">
      <el-table-column
        prop="name"
        label="名字"
        width="180"
      ></el-table-column>
      <el-table-column
        label="图片"
        width="180"
      >
        <template slot-scope="prop">
          <img
            class="icon"
            :src="prop.row.url"
            alt
          >
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        width="180"
      >
        <template slot-scope="prop">
          <el-input-number
            size="small"
            :min="1"
            v-model="prop.row.num"
            label="描述文字"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="180"
      ></el-table-column>
      <el-table-column
        label="总价"
        width="180"
      >
        <template slot-scope="prop">{{prop.row.num*prop.row.price}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="prop">
          <el-button
            type="danger"
            @click="deleteGoods(prop.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总价 -->
    <p>总价:{{totalPrice}}</p>
    <!-- 结算 -->
    <el-button
      style="margin-top:10px;margin-bottom:10px;"
      @click="payMoney"
      type='success'
    >结算</el-button>
  </div>
</template>
<script>
// 进入购物车页面 获取Vuex的数据 渲染到页面上
// import {getLocalGoodsList} from '../tools/localStorageHelper'
export default {
  data() {
    return {
      goodsList: []
    }
  },
  // 计算属性 计算总价
  computed: {
    totalPrice() {
      let sum = 0
      this.goodsList.forEach(item => {
        sum += item.num * item.price
      })
      return sum
    }
  },
  methods: {
    deleteGoods(id) {
      this.$confirm('确定删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const index = this.goodsList.findIndex(item => item.id === id)

          this.goodsList.splice(index, 1)
        })
        .catch(() => {
          // 后悔了
        })
    },
    // 清空购物车
    payMoney() {}
  },
  // 组件打开时 用对象生成数组
  created() {
    this.goodsList = this.$store.getters.getGoodsList
  }
}
</script>
<style>
.icon {
  width: 150px;
  height: 150px;
}
</style>
