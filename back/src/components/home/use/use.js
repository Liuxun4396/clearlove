
export default {
  data () {
    return {
      input3: '',
      tableData: [],
      total: 1,
      pagenum: 1,
      showadd: false,
      showMove: false,
      distributions: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      distributionForm: {
        name: '',
        region: []
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        email: [

          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, min: 3, max: 10, message: '格式错误', trigger: 'blur' }
        ],
        mobile: [

          { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, min: 3, max: 10, message: '格式错误', trigger: 'blur' }
        ],

      },
      moveData: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      disdata: {
        id: 0,
        rid: '',
        name: ''
      }
    }
  },

  created () {
    let i = this.$route.params.id

    this.getUser(i)
    this.getDis()
  },
  methods: {
    async getUser (pagenum = 1, query = '') {
      const res = await this.$axios.get('/users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
      })
      console.log(res)
      this.tableData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    changePage (i) {
      this.$router.push('/users/' + i)
      this.getUser(i, this.input3)
    },
    serach () {
      this.getUser(this.pagenum, this.input3)
    },
    showAdd () {
      this.showadd = true
    },
    async add () {
      const res = await this.$axios.post('users', this.addform)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.showadd = false,
          this.$refs.addform.resetFields();
        this.getUser(this.pagenum, this.input3)
        this.$message({
          message: '添加成功！',
          type: 'success',
          duration: 800
        })
      }
    },
    async del (id) {
      console.log(id)
      const res = await this.$axios.delete(`users/${id}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.getUser(this.pagenum, this.input3)
        this.$message({
          message: '删除成功！',
          type: 'success',
          duration: 800
        })
      }
    },
    async change (id, type) {
      const res = await this.$axios.put(`users/${id}/state/${type}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改成功！',
          type: 'success',
          duration: 800
        })
      }

    },
    showM (res) {
      this.showMove = true
      console.log(res)
      let { username, email, mobile, id } = res.row
      this.moveData.username = username
      this.moveData.email = email
      this.moveData.mobile = mobile
      this.moveData.id = id
    },
    async move () {
      const res = await this.$axios.put(`users/${this.moveData.id}`, { email: this.moveData.email, mobile: this.moveData.mobile })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改成功！',
          type: 'success',
          duration: 800
        })
        this.showMove = false
        this.getUser(this.pagenum, this.input3)
      }

    },
    async distribution (res) {
      console.log(res)
      this.distributions = true
      this.distributionForm.name = res.username
      this.disdata.id = res.id
      const rs = await this.$axios.get(`users/${res.id}`)
      console.log(rs)
      this.disdata.rid = rs.data.data.rid
    },
    async getDis () {
      const res = await this.$axios.get('roles')
      console.log(res)
      res.data.data.forEach(v => {
        this.distributionForm.region.push(v)
      });
    },
    async dis () {
      const res = await this.$axios.put(`users/${this.disdata.id}/role`, { rid: this.disdata.rid })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.distributions = false
        this.getUser(this.pagenum, this.input3)
        this.$message({
          message: '修改成功！',
          type: 'success',
          duration: 800
        })
      }
    }

  },


}
