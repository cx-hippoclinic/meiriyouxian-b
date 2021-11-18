/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [
    {
      name: 'product',
    },
    {
      name: 'productList',
    },
    {
      name: 'productAdd',
    },
    {
      name: 'productEdit',
    },
  ],
  admin: [
    {
      name: 'product',
    },
    {
      name: 'productList',
    },
    {
      name: 'productAdd',
    },
    {
      name: 'Category',
    },
    {
      name: 'productEdit',
    },
  ],
};
export function getRoutes(role,routes){
  const routerArr = roleToRoute[role].map(r=>r.name)
  const res = routes.filter(it=>{
    if(routerArr.indexOf(it.name) !== -1){
      if(it.children){
        it.children  = it.children.filter(it2=>routerArr.indexOf(it2.name) !== -1)
      }
      return true
    }
    return false
  })
  return res
}
