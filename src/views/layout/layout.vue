<template>
  <el-container>
    <el-aside width="{width:'auto'}">
      <!-- 图标 -->
      <div class="logo"></div>
      <!-- 菜单项 -->
      <!--
      <el-menu
        router
        default-active="/layout/user"
        :collapse="isCollapse"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i> <span>用户管理</span>
          </template>
          <el-menu-item index="/layout/user">
            <i class="el-icon-menu"></i>用户列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i> <span>权限管理</span>
          </template>
          <el-menu-item index="/layout/roles">
            <i class="el-icon-menu"></i>角色列表
          </el-menu-item>
          <el-menu-item index="/layout/rights">
            <i class="el-icon-menu"></i>权限列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i> <span>商品管理</span>
          </template>
          <el-menu-item index="/layout/goodslist">商品列表</el-menu-item>
          <el-menu-item index="3-2">商品分类</el-menu-item>
          <el-menu-item index="3-3">商品参数</el-menu-item>
        </el-submenu>
      </el-menu>
      -->
      <el-menu
        router
        default-active="/layout/user"
        :collapse="isCollapse"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="item in menus"
          :key="item.id"
          :index="item.authName"
        >
          <template slot="title">
            <i class="el-icon-location"></i> <span>{{item.authName}}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="'/layout/'+subitem.path"
          >
            <i class="el-icon-menu"></i>{{subitem.authName}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i
          @click="toggleMenu"
          style="font-size:30px;color:orange;"
          class="iconfont icon-webicon03"
        ></i>
        <div class="stitle">电商后台管理系统</div>
        <a
          href="javascript:;"
          @click="logout"
          class="logoutbtn"
        >退出</a>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false, //是否折叠
      menus: [] //菜单列表
    }
  },
  created() {
    this.getMenusData()
  },
  methods: {
    handleOpen() {
      // console.log('---handleOpen---')
    },
    handleClose() {
      // console.log('---handleClose---')
    },
    // 打开和关闭菜单按钮
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    logout() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('mytoken')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async getMenusData() {
      const res = await this.$axios.get('menus')

      this.menus = res.data.data
    }
  }
}
</script>

<style scoped>
.btnsize {
  font-size: 36px;
  color: #989898;
  cursor: pointer;
  line-height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  display: block;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow: '';
}
.logoutbtn {
  position: absolute;
  right: 10px;
  color: orange;
}
.el-header {
  background-color: #545c64;
}
.logo {
  height: 60px;
  background: url(../../assets/logo.png);
  background-size: cover;
  background-color: #989898;
}
.stitle {
  position: absolute;
  font-size: 28px;
  overflow: hidden;
  width: 300px;
  color: #fff;
  left: 600px;
  top: 0px;
}
</style>
