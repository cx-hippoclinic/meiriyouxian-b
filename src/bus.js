// const obj = {}
// export default {
//   $on(name,handle){
//     if(!obj[name]){
//       obj[name] = new Set()
//       obj[name].add(handle)
//     }else {
//       obj[name].add(handle)
//     }
//   },
//   $off(name,handle){
//     if(!obj[name]){
//       return
//     }
//     obj[name].delete(handle)
//   },
//   $emit(name,data){
//     if(!obj[name]){
//       return
//     }
//     for (let nameKey of obj[name]) {
//       nameKey(data)
//     }
//   }
// }
import Vue from 'vue'
const bus = new Vue({});
Vue.prototype.$bus = bus
export default bus

