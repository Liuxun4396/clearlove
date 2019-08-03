<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
    }
  },
  methods: {
    indexMethod (index) {
      return index;
    },
    async getList () {
      const res = await this.$axios.get(`rights/list`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
    }
  },
  created () {
    this.getList()
  }
};
</script>
