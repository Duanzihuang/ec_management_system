<template>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="title">数据统计</div>
    <!-- tabs -->
    <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;"
    >
      <el-tab-pane label="饼状图">
        <v-chart :options="pieOptions" />
      </el-tab-pane>
      <el-tab-pane label="柱状图">
        <v-chart :options="barOptions"></v-chart>
      </el-tab-pane>
      <el-tab-pane label="折线图">
        <v-chart
          :options="lineOptions"
        />
      </el-tab-pane>
      <el-tab-pane label="极线图">
        <v-chart
          theme="dark"
          :options="polarOptions"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie' // 按需引入饼图
import 'echarts/lib/chart/bar' // 按需引入柱状图
import 'echarts/lib/chart/line' // 按需引入折线图
import 'echarts/lib/component/polar' // 按需导入极线图
import 'echarts/lib/component/title' // 引入title
import 'echarts/lib/component/legend' // 引入图例
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    // 极线图数据
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    // 柱状图随机数函数
    function randomize() {
      return [0, 0, 0].map(v => {
        return Math.round(300 + Math.random() * 700) / 10
      })
    }
    return {
      tabPosition: 'top',
      // 饼图选项，参考echarts官方文档的选项 https://www.echartsjs.com/option.html#title
      pieOptions: {
        title: {// 标题
          text: '广告来源统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {// 图例
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      barOptions: {// 柱状图选项
        legend: {},
        tooltip: {},
        dataset: {
          // Provide data.
          source: [
            ['Product', '2015', '2016', '2017'],
            ['Matcha Latte', ...randomize()],
            ['Milk Tea', ...randomize()],
            ['Cheese Cocoa', ...randomize()],
            ['Walnut Brownie', ...randomize()]
          ]
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: { type: 'category' },
        // Declare Y axis, which is a value axis.
        yAxis: {},
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      },
      polarOptions: {// 极线图选项
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },
      lineOptions: {// 折线图选项
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        legend: {
          data: ['华东', '华北', '华南', '西部', '其他']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '华北',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '华南',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '西部',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '其他',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
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
</style>
