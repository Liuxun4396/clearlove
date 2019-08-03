export default {
  data () {
    return {
      tableData: [],
      showM: false,
      rdata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      id: 0,

    }
  },
  methods: {
    indexMethod (index) {
      return index;
    },
    async getList () {
      const res = await this.$axios.get(`roles`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
    },
    async getr () {
      const res = await this.$axios.get(`rights/tree`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rdata = res.data.data
      }
    },
    showm (i) {
      this.showM = true
      this.id = i.id
      let did = []
      i.children.forEach(v => {
        v.children.forEach(v2 => {
          v2.children.forEach(v3 => {
            did.push(v3.id)
          })
        })
      });
      console.log(did)
      // getHalfCheckedKeys
      this.$nextTick(() => {
        // console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(did)
      })
    },
    async changeR () {
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let key = [...keys1, ...keys2]
      const rids = key.join(',')
      console.log(rids)
      const res = await this.$axios.post(`roles/${this.id}/rights`, { rids })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '分配权限成功',
          type: 'success',
          duration: 800
        })
        this.showM = false
        this.getr()
      }
    }
  },
  created () {
    this.getList()
    this.getr()
  }
}
