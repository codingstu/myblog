import Vue from 'vue'
import VueRouter from 'vue-router'
import ShowBlog from '../components/ShowBlog'
import AddBlog from '../components/AddBlog'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/ShowBlog'
  },
  {
    path:'/ShowBlog',
    component:ShowBlog
  },
  {
    path:'/AddBlog',
    component:AddBlog
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass:'myActive'
})

export default router
