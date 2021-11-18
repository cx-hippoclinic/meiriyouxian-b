import request from "./request"

export function loginIn(data){
  return request({
    method:'post',
    url:'/passport/login',
    data
  })
}
