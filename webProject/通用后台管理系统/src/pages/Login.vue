<template>
  <div class="login" style="margin-top: 25vh; width: 100%;">
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span>登录界面</span>
      </div>
      <el-form ref="form" :model="loginInfo" :rules="rules">
        <el-form-item label="账户" prop="username">
          <el-input v-model="loginInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '@/api';

export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
      },
      rules:{
        username: [
        { required: true, message: '请输入账户', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    onSubmit(){

      this.$refs.form.validate((valid) => {
        if(valid){
          getMenu(this.loginInfo).then(({data}) =>{
            if(data.code == 20000){
              console.log("打印data.data" ,data.data)

              Cookie.set('token', data.data.token)
              // console.log('菜单内容', data.data.menu)
             
              var userinfo = {}
              userinfo.name = data.data.name
              userinfo.img = data.data.img
              userinfo.access = data.data.access
             
              this.$store.commit('updatedUserInfo', userinfo)
              this.$store.commit('updateMenu', data.data.menu)
              
              this.$router.push('/home')
            }
            else{
              this.$message.error(data.data.message);
            }
          })
        
        }
        else{
          this.$message.warning("请认真填写信息哦~")
        }
      
      })

    }
  }
}
</script>


<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.el-card{
  margin: 0 auto;
  width: 25vw;
}
</style>