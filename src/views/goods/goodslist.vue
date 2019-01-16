<template>
  <div>
    <!-- 1.0 搜索框和按钮 -->
    <div>
      <el-input
        placeholder="请输入搜索内容"
        v-model="query"
        @keyup.enter.native="getGoodsListData"
        class="search"
      >
        <el-button
          @click="getGoodsListData"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="addGoods"
      >添加商品</el-button>
    </div>
    <!-- 2.0 表格 -->
    <el-table
      :data="goodsList"
      v-loading="loading"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="80"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="名称"
        width="340"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="价格"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="库存量"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        :formatter="stateFormatter"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        :formatter="timeFormatter"
        label="创建时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]"
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
      total: 0, // 总条数
      pagenum: 1, // 每页多少条
      pagesize: 10, //当前页码
      query: '', //关键字
      goodsList: [], // 商品列表
      loading: true //加载中
    }
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    // 获取商品列表
    async getGoodsListData() {
      this.loading = true

      const res = await this.$axios.get(`goods`, {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        }
      })

      this.loading = false

      this.total = res.data.data.total
      this.goodsList = res.data.data.goods
    },
    addGoods() {
      // this.$router.push({path:'/layout/goods/addgoods'})
      this.$router.push({ name: 'addgoods' })
    },
    // 状态格式化
    stateFormatter(goods, column) {
      let state = ''
      switch (goods.goods_state) {
        case 0:
          state = '未通过'
          break
        case 1:
          state = '审核中'
          break
        case 2:
          state = '已审核'
          break
      }

      return state
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 时间格式化
    timeFormatter(goods, column) {
      const date = new Date(goods.add_time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      return (
        [year, month, day].map(this.formatNumber).join('-') +
        ' ' +
        [hour, minute, second].map(this.formatNumber).join(':')
      )
    },
    // 页容量改变了
    handleSizeChange(size) {
      this.pagesize = size
      this.pagenum = 1
      this.getGoodsListData()
    },
    // 页码改变了
    handleCurrentChange(page) {
      this.pagenum = page
      this.getGoodsListData()
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 400px;
  margin-right: 5px;
}
.el-pagination {
  background-color: #d3dce6;
  padding-top: 10px;
  height: 35px;
  line-height: 35px;
}
</style>

