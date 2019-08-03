<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"> <img
              src="../assets/logo.png"
              alt=""
            ></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h1>电商后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"><a
              href=""
              @click.prevent="out"
            >退出</a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">

        <el-menu
          :router='true'
          :default-active="diz()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/rights">角色列表</el-menu-item>
              <el-menu-item index="/roles">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {



  methods: {
    diz () {
      return this.$route.path
    },
    async out () {
      try {
        await this.$confirm('是否确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        this.$router.push('/')
      } catch (eror) {
        this.$message({
          type: 'info',
          message: '已取消！',
          duration: 800
        })
      }

    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang='less'>
.el-header {
  background-color: #b3c1cd;
  line-height: 60px;
  h1 {
    text-align: center;
    font-size: 26px;
    color: #fff;
  }
  a {
    text-decoration: none;
    font-size: 20px;
    color: orange;
  }
  .el-col:nth-child(3) .bg-purple {
    text-align: right;
  }
}
.el-container {
  height: 100%;
  .el-main {
    background-color: #eaeef1;
  }
  .el-aside {
    background-color: #545c64;

    .el-menu {
      border: none;
    }
  }
}
</style>
