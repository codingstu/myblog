<template>
  <div id="app">
   
    <router-view></router-view>
   
    
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import router from './router/index'

export default {
name:'App',
components:{
  Footer,
  router
}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>>

