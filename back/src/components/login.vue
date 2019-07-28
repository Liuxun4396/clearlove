<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span=8>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width=""
        class="demo-ruleForm"
      >
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="success"
            @click="submitForm('ruleForm')"
          >登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
export default {

  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.ruleForm).then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
            this.$router.push('/home')
          } else {
            this.$message({
              message: '账号或密码错误！',
              type: 'error'
            })
          }
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang='less' scoped>
.el-row {
  background-color: #2d434c;
  height: 100%;
  .el-form {
    height: 100%;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 25px;
  }
}
</style>
