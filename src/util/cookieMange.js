 const cookieMange = {
  set: function (name, value, date) {
    //expires            date 单位为 天
    // var endDate = new Date()
    // endDate.setDate(new Date().getDate() + date)
    // document.cookie = key+'='+value+'; '+'expires='+ endDate +';'
    // max-age            date 单位为 秒
    document.cookie = name + '=' + value + '; ' + 'max-age=' + date + ';'

  },
  remove: function (name) {
    this.set(name, '', -1)
  },
  get: function (name) {
    let arr = document.cookie.split('; ')
    for (let i = 0; i<arr.length; i++){
      let item = arr[i].split('=')
      if(item[0] === name){
        return item[1]
      }
    }
  },
}
export function getCookieData(){
  const obj = {}
  obj.email = cookieMange.get('email')
  obj.username = cookieMange.get('username')
  obj.role = cookieMange.get('role')
  obj.appkey = cookieMange.get('appkey')
  return obj
}
export function removeCookieData(){
  cookieMange.remove('email')
  cookieMange.remove('username')
  cookieMange.remove('role')
  cookieMange.remove('appkey')
}
export default cookieMange
