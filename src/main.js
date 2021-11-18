import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { VeLine } from 'v-charts-v2/lib/index.esm'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import '@/assets/common.less'
import './bus'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.component(VeLine.name,VeLine)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

