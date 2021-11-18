import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import Layout from '../components/SideMenu'
import { getRoutes } from "@/util/permiseeion"
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {

  return originalPush.call(this, location).catch(err => err)

}
const asyncRoutes = [{
  path: '/product',
  name: 'product',
  redirect: '/product/list',
  component: Layout,
  mate: {name: '商品', icon: 'inbox', hidden: false},
  children: [
    {
      path: 'list',
      name: 'productList',
      mate: {name: '商品列表', icon: 'menu', hidden: false},
      component: () => import( '@/views/List.vue'),
    },
    {
      path: 'add',
      name: 'productAdd',
      mate: {name: '添加商品', icon: 'folder-add', hidden: false},
      component: () => import( '@/views/Add.vue'),

    },
    {
      path: 'edit/:id',
      name: 'productEdit',
      mate: {name: '修改商品', hidden: true},
      component: () => import( '@/views/Edit.vue'),
    },
    {
      path: 'category',
      name: 'Category',
      mate: {name: '分类管理',icon: 'appstore', hidden: false},
      component: () => import( '@/views/Edit.vue'),
    },
  ]
}]

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    mate: {name: '登录', hidden: true},
  },
  {
    path: '/',
    name: 'index',
    component: Layout,
    mate: {name: '首页', icon: 'home', hidden: false},
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'homeIndex',
        mate: {name: '统计', icon: 'fund', hidden: false},
        component: () => import( '@/views/Home.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
let isAddRouter = false
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      if(!isAddRouter){
        const menuRoutes = getRoutes(store.state.user.role,asyncRoutes)
        store.dispatch('changeMenuRoutes',routes.concat(menuRoutes)).then(res=>{
          router.addRoutes(menuRoutes);
          next()
        })
        isAddRouter = true
      }
      return next()
    }else {
      return next({name:'login'})
    }
  }
  return next()
})
export default router
