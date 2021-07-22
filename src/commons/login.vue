<template>
<div class="login">
  <el-form label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名">
      <el-input type="text" v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password"></el-input>
    </el-form-item>
   
    <el-form-item class="btn">
      <el-button type="primary" @click="getUser" class="loginbtn">登录</el-button>
      <el-button type="text" @click="loginClick" class="registerbtn">没有账号，去注册</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
mounted(){
    //绑定事件
     window.addEventListener('keydown',this.keyDown);
  },

  methods: {
    //  keyDown(e){
    //     //如果是回车则执行登录方法
    //   if(e.keyCode == 13){
    //     this.getUser();
    //   }
    // },

    getUser(){
       const data = {
        username: this.username,
        password: this.password
      }
      this.$http.get('/api/user/getUser', {
        params: data
      }).then((res) => {
        console.log(res)
         const code = res.data.statusCode
         const msg = res.data.msg
         if( code == 200) {
            this.$notify({
                          title : '恭喜你',
                          message : '登录成功',
                          type : 'success'
                      });
         //登录成功，直接跳转博客页
            this.$router.push('/ShowBlog')
          }else {
            alert(msg)
          }
        
      })
    },
    loginClick(){
      this.$router.push('/register')
    }
  },
};
</script>


<style scoped>
  .login {
  width: 500px;
  margin: 100px auto;
  border: 1px solid #efefef;
  border-radius: 30px;
  padding: 20px;
}
h4 {
  text-align: center;
}
.loginbtn {
  width: 100%;
}
.registerbtn{
   width: 100%;
}
.btn{
  text-align: center;
}
</style>