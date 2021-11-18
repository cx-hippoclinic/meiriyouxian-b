import axios from "axios"
import store from '@/store'
import {message} from "ant-design-vue"
import QS from 'qs';
const instance = axios.create({
  baseURL:'https://mallapi.duyiedu.com/',

})

instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        appkey: store.state.user.appkey
      }
      // 需要将数据格式化，否则传到后台就错了
      config.data = QS.stringify(config.data)
    }else if (config.method === 'get' || config.method === 'delete') {
      config.params = {
        appkey: store.state.user.appkey,
        ...config.params
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(function (res){
  const result = res.data
  if(!result.data){
    message.error(result.msg,2)
  }else {
    return result.data
  }
  return null
})
export default instance
