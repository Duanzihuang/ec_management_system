<template>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 1.0 搜索框和按钮 -->
    <div>
      <el-input
        placeholder="请输入搜索内容"
        v-model="query"
        @keyup.enter.native="getGoodsListData"
        class="search"
      >
        <el-button
          @click="getOrderListData"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>
    <!-- 2.0 表格 -->
    <el-table
      :data="orderList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="210"
      >
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :formatter="statusFormatter"
        prop="pay_status"
        label="订单状态"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="order_fapiao_title"
        label="发表抬头"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :formatter="timeFormatter"
        label="下单时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            class="el-icon-setting"
            size="small"
            type="primary"
            @click="showAddress"
            plain
          ></el-button>
          <el-button
            class="el-icon-location"
            size="small"
            type="warning"
            @click="showMap(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 3.0 分页条 -->
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
    <!-- 4.0 显示地图对话框 -->
    <el-dialog
      title="显示地图"
      :visible.sync="dialogVisible4Map"
      width="50%"
    >
      <baidu-map class="map"></baidu-map>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4Map = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible4Map = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 5.0 省市区三级联动 -->
    <el-dialog
      title="地址选择"
      :visible.sync="dialogVisible4City"
      width="50%"
    >
      <v-distpicker
        :province="area.province.value"
        :city="area.city.value"
        :area="area.area.value"
        @selected="onSelected"
      ></v-distpicker>
      <el-input
        type="textarea"
        style="margin-top:10px;"
        :rows="3"
        placeholder="请输入详细地址"
        v-model="detailAddress"
      >
      </el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible4City = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getAddress"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  components: { VDistpicker },
  data() {
    return {
      orderList: [], // 订单列表
      pagenum: 1, //页码
      pagesize: 10, //页容量
      total: 0, //总数
      query: '', //查询关键字
      dialogVisible4Map: false, //显示地图
      dialogVisible4City: false, //显示省市区
      area: {
        // 省市区
        province: {
          code: '440000',
          value: '广东省'
        },
        city: {
          code: '440300',
          value: '深圳市'
        },
        area: {
          code: '440306',
          value: '宝安区'
        }
      },
      detailAddress: '' //详细地址
    }
  },
  created() {
    this.getOrderListData()
  },
  methods: {
    async getOrderListData() {
      const res = await this.$axios.get(`orders`, {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })

      this.orderList = res.data.data.goods
      this.total = res.data.data.total
    },
    statusFormatter(row) {
      let statusName = ''
      switch (row.pay_status) {
        case '0':
          statusName = '未支付'
          break

        case '1':
          statusName = '已支付'
          break

        default:
          break
      }

      return statusName
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    timeFormatter(row) {
      const date = new Date(row.create_time)
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
      this.getOrderListData()
    },
    // 页码改变了
    handleCurrentChange(page) {
      this.pagenum = page
      this.getOrderListData()
    },
    // 展示地图
    showMap() {
      this.dialogVisible4Map = true
    },
    // 显示省市区三级联动
    showAddress() {
      this.dialogVisible4City = true
    },
    getAddress() {
      this.dialogVisible4City = false

      const address = `${this.area.province.value} ${this.area.city.value} ${
        this.area.area.value
      } ${this.detailAddress}`

      this.$message({
        type: 'success',
        message: `您的地址是：${address}`
      })
    },
    // 选择地址
    onSelected(area) {
      this.area = area
    }
  }
}
</script>

<style lang="scss" scoped>
/* 地图容器必须设置宽和高属性 */
.map {
  width: 600px;
  height: 350px;
}
.el-pagination {
  background-color: #d3dce6;
  padding-top: 10px;
  height: 35px;
  line-height: 35px;
}
</style>
