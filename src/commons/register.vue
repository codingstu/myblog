<template>
  <el-form label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名">
      <el-input type="text" v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input type="password" v-model="checkpwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addUser">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from "element-ui";
// import {
//   validateUsername,
//   validatePassword,
//   validatePhone,
//   validateRealName,
//   validateIdNumber,
// } from "./validate";
export default {
  data() {
    return {
      username: "",
      checkpwd: "",
      password: "",
      // registerRules: {
      //   username: [
      //     { required: true, trigger: "blur", validator: validateUsername },
      //   ],
      //   password: [
      //     { required: true, trigger: "blur", validator: validatePassword },
      //   ],
      //   password_repeat: [
      //     {
      //       required: true,
      //       trigger: "blur",
      //       validator: this.validatePassRepeat,
      //     },
      //   ],
      //   bind_phone: [
      //     { required: true, trigger: "blur", validator: validatePhone },
      //   ],
      //   realname: [
      //     { required: true, trigger: "blur", validator: validateRealName },
      //   ],
      //   id_number: [
      //     { required: true, trigger: "blur", validator: validateIdNumber },
      //   ],
      // },
    };
  },
  components: {
    Message,
  },
  mounted(){
    //绑定事件
    //  window.addEventListener('keydown',this.keyDown);
  },
  methods: {
    //  keyDown(x){
    //     //如果是回车则执行登录方法
    //   if(x.keyCode == 13){
    //     this.addUser();
    //   }
    // },
    addUser() {
      const name = this.username;
      const checkpwd = this.checkpwd;
      const password = this.password;
       const reg = /^[0-9A-Za-z]{8,16}$/;
       const pas = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]{4,8}$/;
      if (reg.test(name)&&pas.test(password)&&(password==checkpwd)) {
         this.$http.post(
          "/api/user/addUser",
          {
            username: name,
            password: password,
            checkpwd: checkpwd,
          },
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
           this.$message({
                title: "恭喜你",
                message: "注册成功",
                type: "success",
              });
              this.$router.push({ path: "/login" });
            
          } else {
            alert(msg);
          }
        });
              
            } else if (name == "" || name.length > 16 || name.length < 8) {
              this.$message({
                message: "请输入8-16位有效用户名",
                type: "warning",
              });
            }
            else if (password!==checkpwd) {
              this.$message({
                message: "请输入相同的密码",
                type: "warning",
              });
            }else{
                this.$message({
                message: "请输入4-8位英文+数字的密码",
                type: "warning",
              });
            }
            
     
    },
  },
};
</script>