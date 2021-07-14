import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowBlog from '../components/ShowBlog'
import AddBlog from '../components/AddBlog'
import login from '../commons/login'
import register from '../commons/register'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/register',
    meta: {
      title: '首页',
      type: 'register'  // 是否需要判断是否登录,这里是需要判断
    }
  },
  {
    path:'/ShowBlog',
    component:ShowBlog
  },
  {
    path:'/AddBlog',
    component:AddBlog
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/register',
    component:register
  },
   
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: 'register',
        type: '' // 不需要鉴权
      }
    }
]

const router = new VueRouter({
  routes,
  linkActiveClass:'myActive'
})

export default router

