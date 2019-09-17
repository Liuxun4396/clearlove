<template>
  <div class="">
    <el-button
      type="success"
      plain
    >添加分类</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        label="分类名称"
        prop="cat_name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cat_deleted?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level==0">一级</span>
          <span v-if="scope.row.cat_level==1">二级</span>
          <span v-if="scope.row.cat_level==2">三级</span>
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
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.getList()

  },
  methods: {
    async getList () {
      const res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      console.log(res)
      this.tableData = res.data.data
    },
  }
}
</script>
