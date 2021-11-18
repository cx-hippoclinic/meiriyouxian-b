import request from "./request"
export function getProductList({searchWord='',category=''} = {}){
  return request({
    url:`/products/all`,
    method:'get',
    params: {
      searchWord,category
    }
  })
}
export function getCategory(){
  return request({
    url:`/category/all`,
    method:'get'
  })
}
export function delProduct(id){
  return request({
    url:`/products/${id}`,
    method:'delete'
  })
}
export function getProductDetail(id){
  return request({
    url:`/products/${id}`,
    method:'get'
  })
}
export function editProductDetail(data){
  return request({
    url:`/products/edit`,
    method:'put',
    data
  })
}
export function addProduct(data){
  return request({
    url:`/products/add`,
    method:'post',
    data
  })
}
