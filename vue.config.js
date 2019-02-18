module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  lintOnSave:false, //关闭eslint的检查功能
  baseUrl:'./', //打包出来的index.html能加载我们打包出来的app.js
  productionSourceMap:false, //生产环境打包的时候，不需要打包sourceMap文件
  configureWebpack:{
      externals: {
          // 左边的名字是 import xx from '包名'  包名
          // 右边的名字是 cdn中导入的第三方包js的名字
          vue: 'Vue',
          axios: 'axios',
          'vue-router': 'VueRouter',
      }
  }
}
