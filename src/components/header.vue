<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" class="pic" />
    </div>
    <div class="link">
      <router-link to="/ShowBlog">博客列表</router-link>
      <router-link to="/AddBlog">添加博客</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
      <router-link to="/news">新闻</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang='less'>
.header {
  height: 90px;
  background-color: #41b883;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 100%;
    img {
      height: 80%;
      margin: 10% 0 0 20px;
    }
  }
}

.header .link {
  padding-right: 20px;
  display: flex;
  a {
  display: block;
  padding: 8px 30px;
  margin-left: 30px;
  color: #fff;
  border-radius: 3px;
  }
  a:hover {
  background-color: #fff;
  color: #41b883;
}
.myActive{
    background: #fff;
    color: #41b883;
  }
}
</style>>

