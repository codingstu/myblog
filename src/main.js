import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueResource from 'vue-resource';
Vue.use(VueResource);


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'register') {
    if (window.localStorage.getItem('register')) {
      next()
    } else {
      next('/register')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

