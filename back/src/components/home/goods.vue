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
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        label="分类名称"
        prop="goods_name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="价格"
        prop="goods_price"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="数量"
        prop="goods_number"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="时间"
        prop="add_time"
      >
        <template slot-scope="scope">
          <span>{{scope.row.add_time | f1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
  created () {
    this.getLIst()
  },
  methods: {
    indexMethod (index) {
      return index + 1;
    },
    async getLIst () {
      const res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 10
        }
      })
      console.log(res)
      this.tableData = res.data.data.goods
    }
  },
  filters: {
    f1 (res) {

    }
  }
}
</script>

