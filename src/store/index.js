import Vue from 'vue'
import Vuex from 'vuex'
import { loginIn } from "@/api/login"
import cookieMange, { getCookieData, removeCookieData } from "@/util/cookieMange"
import { message } from "ant-design-vue"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed:false,
    user:getCookieData(),
    routes:[],
    category:[]
  },
  mutations: {
    changeCollapsed(state){
      state.collapsed = !state.collapsed
    },
    changeRoutes(state,payload){
      state.routes = payload
    },
    changeCategory(state,payload){
      state.category = payload
    },
    changeUser(state,payload){
      state.user.email = payload.email
      state.user.username = payload.username
      state.user.role = payload.role
      state.user.appkey = payload.appkey
    },
    loginOutUser(state){
      state.user.email = null
      state.user.username = null
      state.user.role = null
      state.user.appkey = null
    }
  },
  actions: {
    async userLogin({commit},payload){
      const res = await loginIn(payload)
      if(res){
        message.success('登录成功',2)
        cookieMange.set('email',res.email,10000000)
        cookieMange.set('username',res.username,10000000)
        cookieMange.set('role',res.role,10000000)
        cookieMange.set('appkey',res.appkey,10000000)
        commit('changeUser',res)
        return res
      }
    },
    userLoginOut({commit}){
      removeCookieData()
      commit('loginOutUser')
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeRoutes', routes);
    },

  },
  modules: {
  }
})
